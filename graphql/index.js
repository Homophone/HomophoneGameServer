const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} = require('graphql')

const {
  word_set: wordSet,
  game,
  round
} = require('../db/models')

const wordSetType = require('./types/wordset')
const gameType = require('./types/game')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      wordSets: {
        type: new GraphQLList(wordSetType),
        resolve() {
          return wordSet.findAll()
        }
      },
      games: {
        type: new GraphQLList(gameType),
        resolve() {
          return game.findAll()
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      startNewGame: {
        type: gameType,
        description: 'Start a new game',
        resolve(value) {
          return game.create()
          .then((newGame) => round.create({
            gameId: newGame.id
          })
            .then(() => newGame))
        }
      }
    }
  })
})

module.exports = schema
