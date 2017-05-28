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
  beforeEach(() => { // Before each test we create some records
    const set1 = JSON.stringify([{
      "word": "bear",
      "image": "https://s-media-cache-ak0.pinimg.com/736x/4f/de/00/4fde00b6e6bcbda75a35f1b234b7a38f.jpg"
    }, {
      "word": "bare",
      "image": "https://thepeoplespharmacy-graedonenterpris.netdna-ssl.com/wp-content/uploads/Bare-Feet.jpg"
    }, {
      "word": "bair"
    }]);

    const set2 = JSON.stringify([{
      "word": "hostel",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hostel_Dormitory.jpg/250px-Hostel_Dormitory.jpg"
    }, {
      "word": "hostile",
      "image": "https://2prowriting.files.wordpress.com/2014/12/hostility.jpg"
    }])

    return wordset.bulkCreate([{
      words: set1
    }, {
      words: set2
    }])
  });

  afterEach(() => { // After each test we empty the database
    wordset.destroy({where: {}});
  });

  it('should list ALL word sets on /word_sets GET', function(done) {
    chai.request(server)
      .get('/api/word_sets')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
        done();
      });
  });

});
