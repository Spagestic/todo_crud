// user.actions.ts
"use server";
import connectToDatabase from "../mongodb";
import User from "../models/user";
import { revalidatePath } from "next/cache";

// create a user after authentication
export async function createUser(userData: { name: string; email: string }) {
  try {
    // Connect to database
    await connectToDatabase();
    // Check if the user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      //   console.log("User already exists:", existingUser);
      return existingUser;
    } else {
      const user = new User(userData);
      await user.save();
      console.log("User created:", user);
      return user;
      //   revalidatePath("/");
    }
  } catch (error) {
    console.error("Error creating user: ", error);
    return error;
  }
}

// get a user by email
export async function getUser(email: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Fetch the user
    const user = await User.findOne({ email: email });
    // Return the user
    // console.log("Fetched user:", user);
    return user;
  } catch (error) {
    // Log and return error
    console.error("Error fetching user: ", error);
    return error;
  }
}
