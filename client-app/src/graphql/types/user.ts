import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    id: Int
    name: String
    lastName: String
    email: String
    city: String
    address: String
    country: String
    isAdmin: Boolean
  }

  type Query {
    users: [User]
  }
`;

export default typeDefs;
