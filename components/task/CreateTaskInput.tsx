// CreateTaskInput.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/lib/actions/task.actions";
import { DateTimePicker } from "@/components/ui/datetime-picker";

export default function CreateTaskInput({ userId }: { userId: string }) {
  // console.log("userId:", userId);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = React.useState<Date>();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      setIsAdding(true);
      try {
        await createTask({ user: userId, title: newTask, time: time });
        setNewTask(""); // Clear the input field
      } catch (error) {
        console.error("Failed to add task:", error);
      } finally {
        setIsAdding(false); // Reset adding state
      }
    }
  };

  return (
    <div className="mb-6 flex gap-2 justify-center items-center">
      <Input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isAdding) {
            handleAddTask();
          }
        }}
        className="w-full border-2 border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <DateTimePicker value={time} onChange={setTime} />
      <Button
        onClick={handleAddTask}
        variant="default"
        size={"default"}
        className=""
        disabled={isAdding} // Disable the button while adding a task
      >
        {isAdding ? "Adding..." : "Add Task"}
      </Button>
    </div>
  );
}
