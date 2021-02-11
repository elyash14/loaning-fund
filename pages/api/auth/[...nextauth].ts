import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { makeHash } from "../../../src/utils/general";
import Adapters from "next-auth/adapters";
import prisma from '../../../src/prisma/prisma'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Please enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: makeHash( credentials.password)
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
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },

  adapter: Adapters.Prisma.Adapter({ prisma }),

  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.APP_SECRET,

  // debug: true
};

export default (req, res) => NextAuth(req, res, options);
