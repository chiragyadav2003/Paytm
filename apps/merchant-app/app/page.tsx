"use client";

import {useBalance} from "@repo/store/useBalance"

export default function() {
  const balance = useBalance();
  return <div className="flex flex-col justify-center items-center bg-black text-white h-screen text-xl gap-4">
    <h1>Merchant App</h1>
    hi there {balance}
  </div>
}



// export default function Home() {
//   return (
//     <div className="flex flex-col justify-center items-center bg-black text-white h-screen text-3xl">merchant-app</div>
//   );
// }
