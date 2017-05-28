const graphql = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLID = graphql.GraphQLID
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt
const GraphQLBoolean = graphql.GraphQLBoolean

const roundType = new GraphQLObjectType({
  name: 'round',
  description: 'A round',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Primary Key'
    },
    roundNumber: {
      type: GraphQLInt,
      description: 'The round number'
    },
    isCorrect: {
      type: GraphQLBoolean,
      description: 'If user answered correctly'
    },
    correctAnswer: {
      type: GraphQLString,
      description: 'Correct answer for the round'
    },
    selectedAnswer: {
      type: GraphQLString,
      description: 'Answer chosen by the user'
    },
    giphyUrl: {
      type: GraphQLString,
      description: 'URL for the Giphy used for the round'
    },
    giphyToken: {
      type: GraphQLString,
      description: 'Token for the Giphy used for the round'
    }
  }
});

module.exports = roundType
