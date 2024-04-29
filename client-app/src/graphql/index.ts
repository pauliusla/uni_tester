import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./types";
import resolvers from "./resolvers";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});

export const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});
