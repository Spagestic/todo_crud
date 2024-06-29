// task.actions.ts
"use server";
import connectToDatabase from "../mongodb";
import Task from "../models/task";
import { revalidatePath } from "next/cache";

// Function to get all tasks
export async function getTasks(userId: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Fetch all tasks
    const tasks = await Task.find({ user: userId });
    // Return tasks
    // console.log("Fetched tasks:", tasks);
    return tasks;
  } catch (error) {
    // Log and return error
    console.error("Error fetching tasks: ", error);
    return error;
  }
}

export async function getTask(id: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Fetch the task
    const task = await Task.findById(id);
    // Return the task
    // console.log("Fetched task:", task);
    return task;
  } catch (error) {
    // Log and return error
    console.error("Error fetching task: ", error);
    return error;
  }
}

interface Params {
  user: string;
  title: string;
}

// Function to create a task
export async function createTask(taskData: Params) {
  try {
    // Connect to database
    await connectToDatabase();
    // Create the task
    const task = new Task(taskData);
    await task.save();
    // Return the task
    console.log("Task created:", task);
    revalidatePath("/");
  } catch (error) {
    // Log and return error
    console.error("Error creating task: ", error);
    return error;
  }
}

// Function to update a task
export async function updateTaskTitle(id: string, title: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { title } },
      { new: true }
    );
    // Return the updated task
    console.log("Task updated:", updatedTask);
    revalidatePath("/");
  } catch (error) {
    // Log and return error
    console.error("Error updating task: ", error);
    return error;
  }
}

export async function toggleTask(id: string) {
  try {
    await connectToDatabase();
    // First, find the task to get its current completed state
    const task = await Task.findById(id);
    // console.log("Task found:", task);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    // Toggle the completed state
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { completed: !task.completed } }, // Toggle the completed field
      { new: true }
    );
    console.log(updatedTask.completed ? "Task completed" : "Task uncompleted");
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating task: ", error);
    return error instanceof Error ? error : new Error(String(error));
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
    console.log("Task deleted");
    revalidatePath("/");
  } catch (error) {
    // Log and return error
    console.error("Error deleting task: ", error);
    return error;
  }
}

// Function to get the completed value of a task
export async function getCompleted(id: string) {
  try {
    // Connect to database
    await connectToDatabase();
    // Fetch the task
    const task = await Task.findById(id);
    // Return the completed value
    return (task as any).completed;
  } catch (error) {
    // Log and return error
    console.error("Error fetching completed value: ", error);
    return error;
  }
}
