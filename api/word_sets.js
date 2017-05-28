const express = require ('express');
const router = express.Router();
const wordset = require ('../db/models').word_sets;

router.get('/', (req, res, next) => {
  wordset.findAll()
  .then((wordsets) => res.send(wordsets))
  .catch(next);
})

module.exports = router;
