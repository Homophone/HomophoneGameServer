//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const wordset = require ('../../db/models').word_sets;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = require('chai').expect;
const server = require ('../../index');

chai.use(chaiHttp);

//Our parent block
describe('api/word_sets', () => {
  beforeEach((done) => { //Before each test we empty the database
    wordset.destroy({where: {}}).then(() => done());
  });

  it('should list ALL word sets on /word_sets GET', function(done) {
    chai.request(server)
      .get('/api/word_sets')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(0);
        done();
      });
  });

});
