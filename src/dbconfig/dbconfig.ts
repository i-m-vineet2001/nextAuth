import mongoose from "mongoose";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export async function connect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    // Check if MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    // Connect to MongoDB
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      bufferCommands: false // Disable mongoose buffering
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");

  } catch (error: any) {
    console.log("MongoDB connection error:", error.message);
    throw error;
  }
}

