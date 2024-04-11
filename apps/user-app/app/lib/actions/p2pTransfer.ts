"use server"

import { authOptions } from "../auth"
import { getServerSession } from "next-auth"
import prisma from "@repo/db/client"

export async function p2pTransfer(to:string,amount:number){
    //to - it is phone number of receiver/beneficiary
    const session = await getServerSession(authOptions)

    const from = session?.user?.id;
    if(!from){
        return {
            message:"error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number:String(to)
        }
    });

    if(!toUser){
        return {
            message:"User not found"
        }
    };

    await prisma.$transaction(async()=>{
        const fromBalance = await prisma.balance.findUnique({
            where:{
                userId:Number(from)
            }
        });

        if(!fromBalance || fromBalance.amount<amount){
            throw new Error("Insufficient balance")
        }

        await prisma.balance.update({
            where:{
                userId:Number(from)
            },
            data:{
                amount:{
                    decrement:amount
                }
            }
        })

        await prisma.balance.update({
            where:{
                userId:toUser.id
            },
            data:{
                amount:{
                    increment:amount
                }
            }
        })
    })
    console.log("completed")
    return {
        message:"txn completed"
    }
}