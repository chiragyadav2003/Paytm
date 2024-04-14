"use server"

import { authOptions } from "../auth"
import { getServerSession } from "next-auth"
import prisma from "@repo/db/client"

export async function p2pTransfer(to: string, amount: number) {
    //to - it is phone number of receiver/beneficiary
    const session = await getServerSession(authOptions)

    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending: User not authenticated",
            success: false
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: String(to)
        }
    });

    if (!toUser) {
        console.log("beneficiary not exist")
        return {
            message: "Error while sending: Beneficiary not found",
            success: false
        };
    };

    try {
        await prisma.$transaction(async (tx) => {

            //NOTE - row locking
            // tx.$queryRaw is a method provided by Prisma to execute raw SQL queries within a transaction context.
            // The FOR UPDATE clause is used to apply an exclusive lock on the selected rows. This ensures that other transactions attempting to read or modify the same rows will be blocked until the lock is released.

            //NOTE: prisma does not support lock out of the box, so we will use this syntax

            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`

            //* this syntax give error
            // await tx.balance.findUnique({
            //     where:{
            //         userId:Number(from)
            //     },
            //     lock:{
            //         mode:'update'
            //     }
            // })

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("insufficient balance")
            }

            // console.log("before sleep")
            // await new Promise(resolve=>setTimeout(resolve,5000))
            // console.log("after sleep")

            await tx.balance.update({
                where: {
                    userId: Number(from)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })
            //entry in db
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: Number(toUser.id),
                    amount,
                    timeStamp: new Date()
                }
            })
        })
    } catch (error) {
        console.log("transaction failed")
        return {
            error: "transaction failed",
            message: "insufficient balance",
            sucess: false
        }
    }

    console.log("completed")
    return {
        message: "txn completed",
        success: true
    }
}