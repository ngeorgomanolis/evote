//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /GET /candidates request
*/
describe('/GET candidates', () => {
    it('it should get a list of candidates, should be array with length 3', (done) => {
        chai.request(server)
            .get('/candidates')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
        });
    });
});

