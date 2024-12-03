import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import api from "./services/api"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        console.log(credentials)
        

        const response = await api.post("/Users/Login", credentials );
        const { token, id, ...userData } = response.data;

        console.log(response)
    
        if (!token && !id) {
          throw new Error("Invalid credentials.")   
        }
          
        localStorage.setItem("token", token);
        user = userData

        return user
      },
    }),
  ],
})