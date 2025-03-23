import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let client;

export async function connectToDatabase() {
    try {
       client = await MongoClient.connect(process.env.MONGO_URI);
  
    const db = client.db("JaMoveo");
    const usersCollection = db.collection("loginData");
    return { usersCollection, client };
    } catch (error) {
      console.error("Error Connecting To Database:", error);
      throw error
    }
  }