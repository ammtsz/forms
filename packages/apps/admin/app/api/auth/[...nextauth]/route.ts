import { getUser, registerUser } from "@api/services/user";
import { UserSession } from "@types";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }): Promise<UserSession> {
      if (session?.user?.email) {
        const userSession: UserSession = { ...session };

        const savedUser = await getUser(session.user.email);

        if (savedUser && userSession.user) {
          userSession.user.id = savedUser.id;
          userSession.user.forms = savedUser.forms;
        }
        return userSession;
      }

      return session;
    },
    async signIn({ profile }): Promise<boolean> {
      try {
        if (profile?.email) {
          const user = await getUser(profile.email);

          if (!user) {
            await registerUser({
              id: profile.email,
              username: profile?.name?.replaceAll(" ", "").toLowerCase() || "",
              email: profile.email,
              picture: profile?.image || "",
            });
          }
          return true;
        }

        return false;
      } catch (error) {
        console.log("Error checking if user exists: ", error);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
