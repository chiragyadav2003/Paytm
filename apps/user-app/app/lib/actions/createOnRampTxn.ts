// it is a server-action, so we need to define it specifically as server-component

"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export async function createOnRampTransaction(amount:number,provider:string){
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    //NOTE - ideally token should come from the banking provider (hdfc/axis)
    // await axios.post("api.netbanking.hdfcBank.com/getToken", {amount:amount,userId:userId})
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100 //we are storing amount by multiplying with 100 to remove issue
        }
    });


    return {
        message:"on ramp transaction added"
    }


}

//BUG:
//  const token = (Math.random() * 1000).toString();
//     const userId = Number(session.user.id)
//     console.log("userid", userId)
//     prisma.onRampTransaction.create({
//         data:{
//             userId:userId,
//             amount:amount*100,
//             status:"Processing",
//             provider,
//             startTime:new Date(),
//             token
//         }
//     })

