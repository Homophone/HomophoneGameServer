const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql')

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
})

module.exports = roundType
