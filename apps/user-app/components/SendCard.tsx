"use client"

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { Button } from "@repo/ui/button"
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function SendCard() {
    const router = useRouter()

    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    async function handleClick() {
        if (Number(amount) < 0) {
            toast.error("Negative amount is invalid")
            return;
        }
        const res = await p2pTransfer(number, Number(amount) * 100)
        console.log(res)
        if (!res.success) {
            return toast.error(res.message)
        }
        router.refresh()
        return toast.success(res.message)
    }

    return (
        <Card title="Send">
            <div className="min-w-72 pt-2">
                <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                    setNumber(value)
                }} />
                <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                    setAmount(value)
                }} />
                <div className="pt-4 flex justify-center">
                    <Button onClick={handleClick}>Send</Button>
                </div>
            </div>
        </Card>
    )
}