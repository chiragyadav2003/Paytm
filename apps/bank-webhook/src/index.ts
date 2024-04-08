import express from "express";

const app = express()

app.post("/hdfcWebhook", (req,res)=>{
    //TODO: add zod validation

    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    };

    //TODO: updater balance in db, add txn
})