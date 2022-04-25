const { UserType } = require("./TypeDefs");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

//populate db with dummy data
let userData = require("../MOCK_DATA.json");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        let newUser = userData.find((u) => u.id === args.id);
        for (let prop in newUser) if (args[prop]) newUser[prop] = args[prop];
        return newUser;
      },
    },
    deleteUser: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        userData.map((user, index) => {
          if (user.id === args.id) return userData.splice(index, 1);
        });
        return userData;
      },
    },
  },
});
