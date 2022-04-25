const express = require("express");
const app = express();
const PORT = 4808;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

//tells express to use graphqlHTTP middleware with the defined schema using the GraphiQL GUI
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
