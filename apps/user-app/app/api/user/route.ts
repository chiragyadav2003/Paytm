import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}


// import { NextResponse } from "next/server"
// import db from "@repo/db/client";


// export const GET = async () => {
//     try {
//         await db.user.create({
//             data: {
//                 number: "2343242342",
//                 password: "adsads"
//             }
//         })
//         return NextResponse.json({
//             message: "hi there, user created"
//         })
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({
//             error:error
//         })
//     }
// }