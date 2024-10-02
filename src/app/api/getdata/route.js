import mongoose from "mongoose";
import { MongoClient } from "mongodb";
export async function GET(request) {
  console.log("ok");
  const url = "mongodb://localhost:27017/";
  const dbname = "ecommerce-website";
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection("images");
    const data = await collection.find({}).toArray();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

