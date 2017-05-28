const express = require ('express')
const router = express.Router()

const graphqlHTTP = require('express-graphql')
const schema = require('../graphql')

router.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

router.get('/', (req, res) => {
  res.send('Hello Homophoner!')
})

router.use('/word_sets', require('./word_sets/word_sets'))

module.exports = router
