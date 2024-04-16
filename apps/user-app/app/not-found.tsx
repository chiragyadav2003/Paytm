import { getServerSession } from "next-auth"
import { authOptions } from "./lib/auth"


import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotFound() {

    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/api/auth/signin")
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className=" text-3xl font-semibold text-rose-400 animate-bounce shadow-md shadow-red-700 px-6 py-3 rounded-md hover:z-20">Page not found</div>
            <button className=" text-xl font-bold border-2 bg-black text-white px-4 py-2 rounded-xl my-16 hover:shadow-xl hover:shadow-orange-400">
                <Link href={"/"}>Home</Link>
            </button>
        </div>
    );
}