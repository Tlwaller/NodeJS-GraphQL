const { UserType } = require("./TypeDefs");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");

//endpoints that can only fetch data
const RootQuery = require("./Queries");

//endpoints that will insert/alter data
const Mutation = require("./Mutations");

//declares schema for graphqlHTTP middlware
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
