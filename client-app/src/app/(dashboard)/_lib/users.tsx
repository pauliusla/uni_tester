import { client } from "@/graphql";
import gql from "graphql-tag";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      lastName
    }
  }
`;

export const getUsers = async () => {
  try {
    const users = client.query({ query: GET_USERS });

    return users;
  } catch (e) {
    console.log({ e });
    return null;
  }
};
