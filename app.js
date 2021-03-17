const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

//Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`;

//Define resolvers (a resolver is a function that says how you want to populate the data for a single field in your schema. You define all of your server's resolvers in a single JS object). The top-level fields correspond to the schema types (e.g., Query). Each resolver function belongs to whichever type its corresponding field belongs to.
const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get('https://api.github.com/users');
        return users.data.map({ id, login, avatar_url });
      } catch (error) {
        throw error;
      }
    },
  },
};

//Create server with ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
//typeDefs: typeDefs,
//resolvers: resolvers

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
