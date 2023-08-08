import { getUser, registerUser } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await getUser(session.user.email);

      session.user.id = sessionUser.id;

      return session;
    },
    async signIn({ profile }) {
      try {
        const user = await getUser(profile.email);

        if (!user) {
          await registerUser({
            id: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
            email: profile.email,
            picture: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
