const express = require ('express')
const wordSet = require ('../../db/models').word_set

const router = express.Router()

router.get('/', (req, res, next) => {
  wordSet.findAll()
  .then((wordSets) => res.send(wordSets))
  .catch(next)
})

module.exports = router
