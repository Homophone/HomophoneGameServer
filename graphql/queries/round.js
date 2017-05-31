const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')

const {
  round
} = require('../../db/models')

const roundType = require('../types/round')

module.exports = {
  type: roundType,
  args: {
    id: {
      description: 'id of the round',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(obj, { id }) {
    return round.findById(id)
  }
}
