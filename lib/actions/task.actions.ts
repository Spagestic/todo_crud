"use server";
import connectToDatabase from "../mongodb";
import Task from "../models/task";

// Function to get all tasks
export async function getTasks() {
  try {
    // Connect to database
    await connectToDatabase();
    // Fetch all tasks
    const tasks = await Task.find({});
    // Return tasks
    return tasks;
  } catch (error) {
    // Log and return error
    console.error("Error fetching tasks: ", error);
    return error;
  }
}

interface Params {
  title: string;
  completed: boolean;
}

// Function to create a task
export async function createTask(taskData: Params) {
  try {
    // Connect to database
    await connectToDatabase();
    // Create a new task
    const task = new Task(taskData);
    // Save the task
    await task.save();
    // Return the task
    return task;
  } catch (error) {
    // Log and return error
    console.error("Error creating task: ", error);
    return error;
  }
}

// Function to update a task
export async function updateTask(id: string, taskData: Params) {
  try {
    // Connect to database
    await connectToDatabase();
    // Update the task
    const task = await Task.findByIdAndUpdate(id, taskData, { new: true });
    // Return the updated task
    return task;
  } catch (error) {
    // Log and return error
    console.error("Error updating task: ", error);
    return error;
  }
}

// Function to delete a task
export async function deleteTask(id: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Delete the task
    const task = await Task.findByIdAndDelete(id);
    // Return the deleted task
    return task;
  } catch (error) {
    // Log and return error
    console.error("Error deleting task: ", error);
    return error;
  }
}
