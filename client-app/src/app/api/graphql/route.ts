import { yogaSchema } from "@/graphql";
import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema: yogaSchema,

  graphqlEndpoint: "/api/graphql",

  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
