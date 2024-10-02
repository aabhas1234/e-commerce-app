import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Add user ID to the session
      return session;
    },
    async redirect({ url, baseUrl }) {
        // Define the callback URL (use an absolute or relative path)
        return baseUrl ;
      },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
