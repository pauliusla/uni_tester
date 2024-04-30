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

        const { user, token } = await databaseProvider.signIn({
          email,
          password,
        });
        if (user) {
          return {
            id: +user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            jwt: token,
          };
        }

        throw new Error("Failure to authenticate");
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
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (!session) {
        return null;
      }

      session.user.id = token.id;
      session.jwt = token.jwt;
      session.user.name = token.name;
      session.user.email = token.email;

      return session;
    },
  },
};
