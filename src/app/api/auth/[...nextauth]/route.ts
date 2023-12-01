import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from '../../../../../utils/mongoose'
import NewWaitListWithTime from '../../../../../models/waitlist'

export const authOptions: any = {
  // Configure one or more authentication providers.
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectMongoDB();
        try {
          const user = await NewWaitListWithTime.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connectMongoDB();
        try {
          const existingUser = await NewWaitListWithTime.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new NewWaitListWithTime({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
