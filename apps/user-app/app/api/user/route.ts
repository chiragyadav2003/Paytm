import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    try {
        await client.user.create({
            data: {
                email: "asd@gmail.com",
                name: "adsads"
            }
        })
        return NextResponse.json({
            message: "hi there"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:error
        })
    }
}