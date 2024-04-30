import {
  DefaultSession,
  NextAuthOptions,
  Session,
  getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DatabaseProvider from "@/providers/DatabaseProvider";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    jwt: string;
    isAdmin: boolean;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    streetAddress: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Session extends DefaultSession {
    user: User;
    jwt: string;
  }
}

export async function getServerSideSession() {
  return await getServerSession(authOptions);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const databaseProvider = new DatabaseProvider();

        try {
          const { user, token } = await databaseProvider.signIn({
            email,
            password,
          });

          if (user) {
            return {
              id: +user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              isAdmin: Boolean(user.is_admin),
              city: user.city,
              country: user.country,
              streetAddress: user.street_address,
              createdAt: user.created_at,
              updatedAt: user.updated_at,
              jwt: token,
            };
          }

          return null;
        } catch (e) {
          throw new Error("Failure to authenticate");
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {},
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = +user.id;
        token.jwt = user.jwt;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.city = user.city;
        token.country = user.country;
        token.streetAddress = user.streetAddress;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }

      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session | null> => {
      if (!session) {
        return null;
      }

      return {
        ...session,
        jwt: token.jwt,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          isAdmin: token.isAdmin,
          city: token.city,
          country: token.country,
          streetAddress: token.streetAddress,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      };
    },
  },
};
