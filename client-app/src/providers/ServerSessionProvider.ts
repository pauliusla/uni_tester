import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DatabaseProvider from "@/providers/DatabaseProvider";

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
    session: async ({ session, token }) => {
      if (!session) {
        return null;
      }

      session.user.id = token.id;
      session.jwt = token.jwt;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;
      session.user.city = token.city;
      session.user.country = token.country;
      session.user.streetAddress = token.streetAddress;
      session.user.createdAt = token.createdAt;
      session.user.updatedAt = token.updatedAt;

      return session;
    },
  },
};
