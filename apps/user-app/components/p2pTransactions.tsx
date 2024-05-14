import { Card } from "@repo/ui/card"

import prisma from "@repo/db/client"

async function getBeneficiaryNumber(id: number) {
    const number = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            number: true
        }
    })
    return number
}



export const P2PTransaction = async ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        toUserId: number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    //NOTE - promisifying map function to get beneficiry number from the db
    //NOTE - we have to make whole map function promisify and await as we can not use promise inside map function
    //NOTE - here we have returned a new modified object which contain receiverNumber not receiver id
    const mappedTransactions = await Promise.all(transactions.map(async (t) => {
        const number = await getBeneficiaryNumber(t.toUserId)
        return {
            number,
            time: t.time.toDateString(),
            amount: t.amount / 100
        };
    }))
    // console.log("mappedTransaxtion", mappedTransactions)
    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {mappedTransactions.map((transaction) => {
                    return (
                        <div className="flex justify-between" key={String(transaction.time)}>
                            <div>
                                <div className="text-sm">
                                    +91 {String(transaction.number?.number)}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {transaction.time}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                Rs {transaction.amount}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

// let number;
// getBeneficiaryNumber(t.toUserId)
//     .then(userNumber => {
//         number = userNumber?.number || null;
//         console.log("number", number)
//         return;
//     })
//     .catch(error => {
//         console.error("Error retrieving beneficiary number:", error);
//     });
// console.log("number outside", number)