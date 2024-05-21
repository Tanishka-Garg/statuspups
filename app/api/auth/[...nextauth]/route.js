import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = nextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
        })
    ],
    async session({session}) {

    },
    async SignIn({profile}){
        try {
            await connectToDB();

        //check if the user already exists


        // if not create new user 
        return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
})

export {handler as GET, handler as POST};