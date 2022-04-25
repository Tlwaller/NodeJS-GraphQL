const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

//establishes structure of user objects
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = {
  UserType,
};
