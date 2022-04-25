const { UserType } = require("./TypeDefs");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLList } = require("graphql");

//populate db with dummy data
const userData = require("../MOCK_DATA.json");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData;
      },
    },
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData.find((u) => u.id === args.id);
      },
    },
  },
});
