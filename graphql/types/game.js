const graphql = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLID = graphql.GraphQLID
const GraphQLList = graphql.GraphQLList
const GraphQLBoolean = graphql.GraphQLBoolean
const roundType = require('./round')

const gameType = new GraphQLObjectType({
  name: 'game',
  description: 'A game',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Primary Key'
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'If game is active'
    },
    rounds: {
      type: new GraphQLList(roundType),
      description: 'A list of rounds',
      resolve(obj, args, context) {
        return obj.getRounds()
      }
    }
  }
});

module.exports = gameType
