import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client"

interface googleSigninProps{
    user:{
        email:string,
        name:string
    },
    account:{
        provider:"google"|"github"
    }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID||"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
        })
    ],
    callbacks:{
        async signin({user,account}:googleSigninProps){
            console.log("hi signin")
            if(!user || !user.email){
                return false;
            }

            //NOTE:upsert is short for "update or insert" and it tries to update a record if it exists or insert a new record if it doesn't.
            await db.merchant.upsert({
                select:{
                    id:true
                },
                where:{
                    email:user.email
                },
                create:{
                    email:user.email,
                    name:user.name,
                    auth_type:account.provider === "google" ? "Google":"Github"
                },
                update:{
                    name:user.name,
                    auth_type:account.provider === "google" ? "Google":"Github"
                }
            });

            return true;
        }
    },
    secret:process.env.NEXTAUTH_SECRET||"secret"
}