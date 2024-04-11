import express from "express";
import db from "@repo/db/client"

const app = express()
app.use(express.json())
interface paymentInformationInterface{
    token : string;
    userId: string;
    amount: string
}

app.post("/hdfcWebhook", async(req,res)=>{

    //TODO -  add zod validation
    // TODO - check if this request is came from hdfc bank, add a webhook secret
    //TODO - check if this onRampTxn is processing or not, if processed then do not repeat

    const paymentInformation:paymentInformationInterface = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    };

    // console.log("Payment information = ", paymentInformation)
    //note: payload is off type
    // {
    //     "token" :"131.42753102933113",
    //     "user_identifier":"16",
    //     "amount": "110000"
    // }

    //init transaction
    try {
        await db.$transaction([

            //update user balance
            db.balance.update({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),

            //onRamp txn
            db.onRampTransaction.update({
                where:{
                    token:String(paymentInformation.token)
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        res.status(200).json({
            message:"Captured"
        })
    } catch (error) {
        console.log(error)
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }

})

app.listen(3003)