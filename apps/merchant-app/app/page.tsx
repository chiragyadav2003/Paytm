import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  // throw new Error("custom error")
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/api/auth/signin")
  }
  return <div className="flex flex-col justify-center items-center bg-black text-white h-screen text-xl gap-4">
    <h1>Merchant App</h1>
  </div>
}



// export default function Home() {
//   return (
//     <div className="flex flex-col justify-center items-center bg-black text-white h-screen text-3xl">merchant-app</div>
//   );
// }
