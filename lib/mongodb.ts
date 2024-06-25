// lib/mongodb.ts
import mongoose from "mongoose";

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Declare global object to hold mongoose connection details
declare const global: {
  mongoose: {
    conn: any;
    promise: any;
  };
};

// Check if MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Initialize cached mongoose connection if it doesn't exist
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
async function connectToDatabase() {
  mongoose.set("strictQuery", true); // Enable strict mode for queries
  // Check if connection exists in cache
  if (cached.conn) {
    // Log connection details
    console.log("Using existing connection");
    return cached.conn;
  }

  // Check if promise exists in cache
  if (!cached.promise) {
    // Define connection options
    const opts = {
      bufferCommands: false, // Disables buffering
      // Additional options here...
    };

    // Start a timer to measure connection time
    console.time("MongoDB Connection Time");

    // Create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI ?? "", opts)
      .then((mongoose) => {
        // Log successful connection
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error("Database connection error: ", error);
        throw error; // Rethrow the error to allow calling code to handle it
      });

    // End the timer after connection promise resolves
    cached.promise.finally(() => console.timeEnd("MongoDB Connection Time"));
  }

  // Wait for the connection promise to resolve
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
