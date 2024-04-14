"use client"

import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { Button } from "@repo/ui/button"
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"
import toast from "react-hot-toast"

export function SendCard() {

    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    async function handleClick() {
        const res = await p2pTransfer(number, Number(amount) * 100)
        if (!res.success) {
            toast.error(res.message)
        }
        toast.success(res.message)
    }

    return (
        <div className="h-[90vh]">
            <Center>
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
            </Center>
        </div>
    )
}