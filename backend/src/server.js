import express from "express"
import {ENV} from "./config/env.js"
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app =express()
app.use(express.json()); // req.body will be json
app.use(clerkMiddleware());// req.auth will be available in req object

app.use("/api/inngest", serve({ client: inngest, functions }));


app.get('/',(req,res)=>{


    res.send("Hello World");
})

const startServer = async() =>{
    try{
        await connectDB();
        if(ENV.NODE_ENV != "production"){
            app.listen(ENV.PORT, ()=>{
    console.log("Server started on port:",ENV.PORT);
});
        }
    }catch(err){
        console.log("Error starting server: ",err);
        process.exit(1);
    }
};

startServer();

export default app;

