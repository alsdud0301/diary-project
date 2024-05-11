import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: NextApiRequest }) => {
    const token = req.headers.authorization || "";
    const user = await fetch("https://api.example.com/user", {
      headers: { authorization: token },
    }).then((res) => res.json());

    return { user };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });