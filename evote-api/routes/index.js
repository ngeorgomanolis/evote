var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/verifyToken');

const {
  createUser,
  getUser,
  login,
  logout,
  isCandidate,
  voteCandidate,
  getCandidates,
  discardVoteCandidate
} = require('../controllers/user')

router.get('/');

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Retrieve list of candidates.
 *     description: Array that contains all candidates
 *     responses:
 *       200:
 *         description: List of candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Candidates'
 */  
router.get('/candidates', getCandidates);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retrieve user profile.
 *     description: Given token retrieve profile account
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Profile account object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Profile'                     
 */ 
router.get('/profile', VerifyToken, getUser);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a system user.
 *     responses:
 *       201:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 $ref: '#/components/schemas/Authentication'
 *                     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: ngeorgomanolis@evote.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: 1
*/
router.post('/register', createUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Sign in User.
 *     responses:
 *       200:
 *         description: Call for signing in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Authentication'
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: ngeorgomanolis@evote.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: 1 
*/
router.post('/login', login);
router.post('/logout', logout);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update user's candidancy status.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Set/Remove user to/from candidancy list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Error in request.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: response message.
 *                   example: Candidate state changed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: Users' identifier
 *                 format: uuid
 *                 description: User's identifier.
 *                 example: 17b96754-84b7-4d63-bf74-3f7734edcdbc
 *               candidate:
 *                 type: boolean
 *                 description: True/False for candidate or not.
 *                 example: true
*/
router.put('/profile/update', VerifyToken, isCandidate);


/**
 * @swagger
 * /vote/add:
 *   post:
 *     summary: Vote a candidate.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       201:
 *         description: An object containing response from api.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Error in request.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: response message.
 *                   example: Vote added.Thank you
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidate_id:
 *                 type: Candidate's identifier
 *                 format: uuid
 *                 description: User's identifier.
 *                 example: 17b96754-84b7-4d63-bf74-3f7734edcdbc  
*/
router.post('/vote/add', VerifyToken, voteCandidate);


/**
 * @swagger
 * /vote/discard:
 *   post:
 *     summary: Discard a vote.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: An object containing response from api.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Error in request.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: response message.
 *                   example: Vote discarded.Thank you
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: Candidate's identifier
 *                 format: uuid
 *                 description: User's identifier.
 *                 example: 17b96754-84b7-4d63-bf74-3f7734edcdbc  
*/
router.post('/vote/discard', VerifyToken, discardVoteCandidate);

/**
 * @swagger
 * components:
 *   schemas:
 *      Candidates:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              description: If there's an error with the request.
 *              example: false
 *            candidates:
 *              type: array
 *              description: Array containing all candidates
 *              example: [{
 *                "id": "17b96754-84b7-4d63-bf74-3f7734edcdbc",
 *                "created_at": "2021-01-25T14:14:15.402Z",
 *                "updated_at": null,
 *                "email": "candidate1@gmail.com",
 *                "candidate": true,
 *                "votes": 0,
 *                "info": null,
 *                "votes_receive": "1"
 *              }] 
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *      Profile:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              description: If there's an error with the request.
 *              example: false
 *            token:
 *              type: string
 *              description: User's authentication token.
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMWU0YmI2LWJiNjctNGQ4Zi05YjFhLTdhNWJhMWMwN2Y1ZCIsImlhdCI6MTYxMTY0OTQ3MiwiZXhwIjoxNjExNzM1ODcyfQ.6JPBAie9p7nZDrvCVXf8QJ2IS44itJ3-OrUySHU7zSo
 *            profile:
 *              type: array
 *              description: Array containing all candidates
 *              example: [{
 *                "id": "17b96754-84b7-4d63-bf74-3f7734edcdbc",
 *                "created_at": "2021-01-25T14:14:15.402Z",
 *                "updated_at": null,
 *                "email": "candidate1@gmail.com",
 *                "candidate": true,
 *                "votes": 0,
 *                "info": null,
 *                "votes_g": [],
 *                "votes_r": "1"
 *              }] 
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *      Authentication:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              description: If there's an error with the request.
 *              example: false
 *            token:
 *              type: string
 *              description: User's authentication token.
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMWU0YmI2LWJiNjctNGQ4Zi05YjFhLTdhNWJhMWMwN2Y1ZCIsImlhdCI6MTYxMTY0OTQ3MiwiZXhwIjoxNjExNzM1ODcyfQ.6JPBAie9p7nZDrvCVXf8QJ2IS44itJ3-OrUySHU7zSo
 */

module.exports = router;
