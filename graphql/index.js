const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

module.exports = schema;
