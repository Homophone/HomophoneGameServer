const express = require ('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../graphql')
const wordSets = require('./word_sets/word_sets')

const router = express.Router()

router.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

router.get('/', (req, res) => {
  res.send('Hello Homophoner!')
})

router.use('/word_sets', wordSets)

module.exports = router
