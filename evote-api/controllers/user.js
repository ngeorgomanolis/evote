var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const Pool = require('pg').Pool

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})

module.exports = {

  /**
  * @function createUser
  * @description Create new user with web json token and hashed password
  */
  async createUser(req,res){
   
    if(!req.body.email || !req.body.password){
      return res
      .status(400)
      .json({
        error: true, 
        message: 'An email and a password are mandarory'
      }); 
    }
    
    //hash users' password
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //User credentials
    const email = req.body.email
    const username = req.body.email.split('@')[0]

    //insert data to postgresql
    const query = `INSERT INTO users (username, email, pwd) VALUES ($1,$2,$3) RETURNING *`
    const values = [username, email, hashedPassword]

    try {

        const results = await pool.query(query, values)

        //sign token
        const token = jwt.sign({id: results.rows[0].id}, config.secret, {
            expiresIn: config.tokenExp 
        });

        res
        .status(201)
        .json({
          error: false, 
          message: 'Registration completed successfully!', 
          token:token
        })

    } catch (error) {

        //Error handling. One case
        //23505: KEY ALREADY EXISTS IN DATABASE
        (error.code == '23505') 
          ? res
            .status(200)
            .json({
              error: true, 
              message: error.detail
            })
          : res
            .status(400)
            .json({
              error: true, 
              message: (error.detail) ? error.detail : error.code
            })
    }
  },

  /**
  * @function getUser
  * @description Get user with x-access-token authentication
  */
  async getUser(req,res){

    const userId = req.userId
    //If token verified proceed with db queries
    const query_get_profile = `SELECT 
    id, 
    created_at, 
    username, 
    email, 
    candidate, 
    info 
    FROM users 
    WHERE id = $1`;

    //Get the number of votes received
    const query_votes_receive = `SELECT 
    count(v.candidate_id) as votes_receive 
    FROM users as u 
    LEFT JOIN votes as v ON "u"."id"="v"."candidate_id" 
    WHERE u.id = $1 
    GROUP BY u.id`

    //Get the number of votes sent
    const query_votes_sent = `SELECT 
    candidate_id 
    FROM votes 
    WHERE user_id = $1 
    GROUP BY candidate_id`

    const values = [userId]

    try {
      const results_profile= await pool.query(query_get_profile, values)
      const results_votes_give = await pool.query(query_votes_sent, values)
      const results_votes_receive = await pool.query(query_votes_receive, values)
      
      const votes_g = results_votes_give.rows
      const votes_r = results_votes_receive.rows[0].votes_receive
       
      res
      .status(200)
      .json({
        error: false, 
        profile: { ...results_profile.rows[0], votes_g, votes_r }
      })

    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: error.detail
        })
    }
  },

  /**
  * @function login
  * @description Sign in User. Email and password parameters. Authentication token acess as response.
  */
  async login(req,res){

    if (!req.body.email || !req.body.password) 
      return res
      .status(401)
      .send({ 
        error: true, 
        message: 'Email or Password is missing' 
      });

    const email = req.body.email
    const pwd = req.body.password

    //check if user with email exists in the system
    const text = 'SELECT * FROM users WHERE email = $1'
    const values = [email]

    try {
        const results = await pool.query(text, values)

        //compare password given with the hashed one
        const passwordIsValid = bcrypt.compareSync(pwd, results.rows[0].pwd);
        
        if (!passwordIsValid) 
          return res
          .status(401)
          .send({ 
            error: true, 
            message:'Authorization failed. Please check your credentials.' 
          });

        //if all OK sign it and create Access token and send
        const token = jwt.sign({ id: results.rows[0].id}, config.secret, {
            expiresIn: config.tokenExp 
        });

        res
        .status(200)
        .json({
          error: false, 
          message: 'Welcome back!', 
          token:token
        })

    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: (error.detail) ? error.detail : error.code
        })
    }

  },

  /**
  * @function logout
  * @description Sign out User. Authentication token access empty.
  */
  async logout(req,res,){
    res.
    status(200)
    .send({ 
      error: false, 
      token: null, 
      message:'Signed out succesfully' 
    });
  },

  /**
  * @function isCandidate
  * @description Changes candidancy status (yes/no). Access token is needed along with the candidates' id and state.
  */
  async isCandidate(req,res){

    const decodedid = req.userId

    if (!req.body.id) 
      return res
      .status(401)
      .send({ 
        error: true, 
        message: 'Candidate id or state missing' 
      });

    const id = req.body.id
    const candidate = (req.body.candidate) ? true : false //true or false

    if (id != decodedid) 
      return res
      .status(401)
      .send({ 
        error:true, 
        auth: false, 
        message: 'Unauthorized action' 
      }); 
  
    //If all OK update state
    const text = 'UPDATE users SET candidate = $1 WHERE id = $2'
    const values = [candidate, id]

    try {
        const results = await pool.query(text, values)
        res
        .status(200)
        .json({
          error: false, 
          message: 'Candidate state changed'
        })

    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: error.detail
        })
    }
  },

  /**
  * @function getCandidates
  * @description Get all active candidates
  */
  async getCandidates(req,res){

    const query = `SELECT 
    u.id,
    u.created_at,
    u.username, 
    u.email,
    u.info,
    count(v.candidate_id) as votes_receive 
    FROM users as u 
    LEFT JOIN votes as v ON "u"."id"="v"."candidate_id" 
    WHERE candidate = true 
    GROUP BY u.id, u.created_at, u.username, u.email, u.info 
    ORDER BY votes_receive desc`

    try {

        const results = await pool.query(query)

        res
        .status(200)
        .json({
          error: false, 
          candidates: results.rows
        })

    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: error.detail
        })
    }
  },

  /**
  * @function voteCandidate
  * @description Vote for candidate. Access token foe authorized user is needed along with the candidates' uuid to vote
  */
  async voteCandidate(req, res) {

    const decodedid = req.userId

    if (!req.body.candidate_id) 
      return res
      .status(401)
      .send({ 
        error: true, 
        auth: false, 
        message: 'Candidate id is missing' 
      });

    //candidate cannot vote for anyone
    const getUserTokenCandidateInfo = 'SELECT * FROM users WHERE id = $1'
    const getUserTokenCandidateVal = [decodedid]

    //user cannot vote for user
    const getCandidateInfo = 'SELECT * FROM users WHERE id = $1'
    const getCandidateInfoVal = [req.body.candidate_id]

    //user has only two votes
    const getUserNumberOfVotes = 'SELECT count(user_id) as numberofvotes FROM votes WHERE user_id = $1'
    const getUserNumberOfVotesVal = [decodedid]

    //Insert data
    const text = 'INSERT INTO votes (user_id,candidate_id) VALUES ($1,$2) RETURNING *'
    const values = [decodedid,req.body.candidate_id]

    try {
        //Check user with access token if she/he is candidate. If so he/she cannot vote for anyone.
        const userInfo = await pool.query(getUserTokenCandidateInfo, getUserTokenCandidateVal)
        if(userInfo.rows[0].candidate)
          return res
          .status(200)
          .json({
            error: true, 
            message:'You are a candidate and so you cannot vote for anyone! Thanks for participating'
          })

        //Check user with access token if she/he is a normal user. Normal users vote only for candidates.
        const candidateInfo = await pool.query(getCandidateInfo, getCandidateInfoVal)
        if(!candidateInfo.rows[0].candidate)
          return res
          .status(200)
          .json({
            error: true, 
            message:'The user you want to vote for is not a candidate. Thanks for voting!'
          })

        //Check user with access token number of votes. Has only two
        const userNumVotes = await pool.query(getUserNumberOfVotes, getUserNumberOfVotesVal)
        if(userNumVotes.rows[0].numberofvotes > 1)
          return res
          .status(200)
          .json({
            error: true, 
            message:'You have already reached your maximum number of votes (2). Discard a vote and try again. Thanks for voting!'
          })

        const results = await pool.query(text, values)
        if(results.rowCount > 0) 
        return res
        .status(201)
        .json({
          error: false, 
          message:'Thanks for voting!'
        })

    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: error.detail, 
          code: error.code})
    }
  },

  /**
  * @function discardVoteCandidate
  * @description Discard vote for candidate. Access token foe authorized user is needed along with the candidates' uuid to vote
  */
  async discardVoteCandidate(req, res) {

    const decodedid = req.userId

    if (!req.body.candidate_id) 
      return res
      .status(400)
      .send({ 
        error: true, 
        auth: false, 
        message: 'Candidate id is missing' 
      });

    const text = 'DELETE FROM votes WHERE user_id = $1 AND candidate_id = $2'
    const values = [decodedid,req.body.candidate_id]

    try {
        const results = await pool.query(text, values)
        res
        .status(200)
        .json({
          error: false, 
          message: 'Vote discarded. Thanks for voting.'
        })
    } catch (error) {
        res
        .status(400)
        .json({
          error: true, 
          message: error.detail
        })
    }

  }
}