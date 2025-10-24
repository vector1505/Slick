import express from "express"
import {ENV} from "./config/env.js"
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js"

const app =express()
app.use(express.json()); // req.body will be json

// Inngest endpoint - MUST be before clerkMiddleware to allow public access
app.use("/api/inngest", serve({ client: inngest, functions }));

// Apply Clerk auth to other routes only
app.use(clerkMiddleware());// req.auth will be available in req object


app.get('/',(req,res)=>{
    res.send("Hello World");
})

// Connect to database (for Vercel serverless, connect on demand in routes)
connectDB().catch(err => console.log("DB connection error:", err));

export default app;

