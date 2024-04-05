"use client"
import { signIn,signOut,useSession } from "next-auth/react"
import {Appbar} from "@repo/ui/appbar"

export default function Page():JSX.Element{
  const session = useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user||"anonymous"}/>
    </div>
  )
}




// export default function Page(): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen items-center justify-center bg-black text-white">
//       <div className="text-3xl">Paytm user app</div>
//     </div>
//   );
// }
