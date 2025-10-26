import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';
import {ENV} from "./env.js"

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUser(userData)
        console.log("Stream User upserted successfully")
    } catch (error) {
        conbsole.log("Error upserting: ",error)
    }
}

export const deleteStreamUser = async (userData) =>{
    try {
        await streamClient.deleteUser(userData)
        console.log("Stream User deleted successfully")
    } catch (error) {
        conbsole.log("Error deleting: ",error)
    }
}

export const generateStreamToken = (userId) =>{
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString)
    } catch (error) {
        console.log("error generating Stream token: ",error)
        return null;
    }
}