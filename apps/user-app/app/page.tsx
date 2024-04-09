import { getServerSession } from "next-auth"
import { authOptions } from "./lib/auth"
import { redirect } from "next/navigation"

export default async function Page(){
  const session = await getServerSession(authOptions)
  
  if(session?.user){
    redirect("/dashboard")
  }else{
    redirect("/api/auth/signin")
  }

}


// export default function Page(): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-black text-white">
//       <Button onClick={()=>console.log("hoi")} classname="bg-red-400 text-lg rounded-xl px-6 py-2">Hello</Button>
//       <div className="text-3xl">Paytm user app</div>
//     </div>
//   );
// }
