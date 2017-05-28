const express = require ('express')
const router = express.Router()
const word_set = require ('../../db/models').word_set

router.get('/', (req, res, next) => {
  word_set.findAll()
  .then((word_sets) => res.send(word_sets))
  .catch(next)
})

module.exports = router
