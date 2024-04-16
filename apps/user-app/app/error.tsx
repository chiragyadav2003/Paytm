"use client"

import Link from "next/link";

const ErrorHandling = ({ error }: { error?: Error }) => {
    console.log("something went wrong, please try again later")
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className=" text-3xl font-semibold text-rose-400 animate-bounce shadow-md shadow-red-700 px-6 py-3 rounded-md hover:z-20">Something went wrong <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            </div>
            <button className=" text-xl font-bold border-2 bg-black text-white px-4 py-2 rounded-xl my-16 hover:shadow-xl hover:shadow-orange-400">
                <Link href={"/"}>Home</Link>
            </button>
        </div>
    )
}

export default ErrorHandling;