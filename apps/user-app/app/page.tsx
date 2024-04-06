"use client"
import { signIn,signOut,useSession } from "next-auth/react"
import {Appbar} from "@repo/ui/appbar"

export default function Page(): JSX.Element{
  const session = useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
    </div>
  )
}


// export default function Page(): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-black text-white">
//       <Button onClick={()=>console.log("hoi")} classname="bg-red-400 text-lg rounded-xl px-6 py-2">Hello</Button>
//       <div className="text-3xl">Paytm user app</div>
//     </div>
//   );
// }
