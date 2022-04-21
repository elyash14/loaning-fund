import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { makeHash } from "utils/general";

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Please enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: makeHash(credentials.password)
          }
        });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    })
  ],
})

