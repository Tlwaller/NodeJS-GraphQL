const express = require("express");
const app = express();
const PORT = 4808;
const userData = require("./MOCK_DATA.json");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

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

//endpoints that can only fetch data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

//endpoints that will insert/alter data
const Mutation = new GraphQLObjectType({
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
  },
});

//declares schema for graphqlHTTP middlware
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

//tells express to use graphqlHTTP middleware with the defined schema using the GraphiQL GUI
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
