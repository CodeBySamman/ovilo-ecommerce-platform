import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],

  callbacks: {

async signIn({ user, account }) {
  try {
    if (account.provider === "google") {

      await connectDB();

      let currentUser = await User.findOne({
        email: user.email
      });

      if(!currentUser){

        let newuser = await User.create({
          email: user.email,
          name: user.email.split("@")[0],
          role: user.email === "smnfatmi38@gmail.com" 
            ? "admin" 
            : "user",
            status: "active"
        });

        user.name = newuser.name;
      }

      return true;
    }

  } catch(error){
    console.log(error);
    return false;
  }
},


async jwt({token,user}){

  if(user){

    await connectDB();

    let dbUser = await User.findOne({
      email:user.email
    });

    token.id = dbUser._id.toString();
    token.role = dbUser.role;
  }

  return token;
},


async session({session, token}){

  session.user._id = token.id;
  session.user.role = token.role;

  return session;
}

}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
