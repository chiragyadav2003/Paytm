import { NextResponse } from "next/server"
import client from "@repo/db/client";


export const GET = async () => {
    await client.merchant.create({
        data: {
            email: "asd",
            name: "adsads",
            auth_type:"Google"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}