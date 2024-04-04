"use client"

import { RecoilRoot } from "recoil"

export const Provider = ({children}:{children:React.ReactNode}) =>{
    return <RecoilRoot>
        {children}
    </RecoilRoot>
}