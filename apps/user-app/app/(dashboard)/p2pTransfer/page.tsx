import { SendCard } from "../../../components/SendCard"
import { P2PTransaction } from "../../../components/p2pTransactions"
import prisma from "@repo/db/client"
import { authOptions } from "../../lib/auth"
import { getServerSession } from "next-auth"

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    })
    return txns.map((t) => ({
        time: t.timeStamp,
        amount: t.amount,
        toUserId: t.toUserId
    }))
}


export default async function P2PTransfer() {
    const transactions = await getP2PTransactions()
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P-TRANSFER
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard />
                </div>
                <div>
                    <P2PTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    )
}
