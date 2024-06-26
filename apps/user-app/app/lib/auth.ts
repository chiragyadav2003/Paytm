import db from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers:[

        CredentialsProvider({

            name:'Credentials',
            
            credentials:{
                phone:{label:"Phone number", type:"text", placeholder:"1234312343"},
                password:{label:"Password", type:"password", placeholder:"............"}
            },
             // TODO: User credentials type from next-aut
            async authorize(credentials:any){
                //TODO: zod and otp validation
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)

                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.number, //BUG: check error  
                            number:existingUser.number
                        }
                    }
                    return null;
                }

                //TODO: Add functionality - send otp to user for login

                try {
                    const user = await db.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    });

                    return {
                        id:user.id.toString(),
                        name:user.name,
                        email:user.number,
                        number:user.number
                    }
                } catch (error) {
                    console.log(error)
                }

                return null;
            }

        })
    ],
    secret:process.env.JWT_SECRET || "secret",
    callbacks:{
        //TODO: fix type here
        async jwt({token,user}:any){
            if(user) token.phoneNumber = user.number;
            return token;
        },
        async session({token,session}:any){
            session.user.id = token.sub
            session.user.number = token.phoneNumber
            return session
        }
    }
} 