"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckIcon,
  Pencil2Icon,
  TrashIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ModeToggle";
import { v4 as uuidv4 } from "uuid";

// Custom hook for task management
function useTaskManager(initialTasks: any) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (text: string) => {
    if (text.trim() !== "") {
      setTasks([...tasks, { id: uuidv4(), text, completed: false }]);
    }
  };

  const handleToggleTask = (id: any) => {
    setTasks(
      tasks.map((task: { id: any; completed: any }) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: any) => {
    // Assuming editing logic is handled elsewhere
  };

  const handleUpdateTask = (id: any, text: any) => {
    setTasks(
      tasks.map((task: { id: any }) =>
        task.id === id ? { ...task, text } : task
      )
    );
    // Reset editing state if necessary
  };

  const handleDeleteTask = (id: any) => {
    setTasks(tasks.filter((task: { id: any }) => task.id !== id));
  };

  return [
    tasks,
    handleAddTask,
    handleToggleTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish project proposal", completed: false },
    { id: 2, text: "Schedule meeting with client", completed: false },
    { id: 3, text: "Buy groceries", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };
  const handleToggleTask = (id: any) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleEditTask = (id: any) => {
    setEditingTaskId(id);
  };
  const handleUpdateTask = (id: any, text: any) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
    setEditingTaskId(null);
  };
  const handleDeleteTask = (id: any) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 flex justify-between">
        <h1 className="text-2xl font-bold">To-Do App</h1>
        <ModeToggle />
      </header>
      <main className="flex-1 p-6">
        <div className="mb-6 flex gap-2 justify-center items-center">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            className="w-full border-2 border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            onClick={handleAddTask}
            variant="default"
            size={"default"}
            className=""
          >
            Add Task
          </Button>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-background border border-input rounded-md px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                />
                {editingTaskId === task.id ? (
                  <Input
                    type="text"
                    defaultValue={task.text}
                    onBlur={(e) => handleUpdateTask(task.id, e.target.value)}
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        handleUpdateTask(task.id, e.target.value);
                      }
                    }}
                    className="w-full border-2 border-input rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-base ${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "font-medium"
                    }`}
                  >
                    {task.text}
                  </label>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingTaskId === task.id ? (
                  <>
                    <Button
                      size="icon"
                      onClick={() => handleUpdateTask(task.id, task.text)}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </Button>
                    <Button size="icon" onClick={() => setEditingTaskId(null)}>
                      <Cross2Icon className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="icon" onClick={() => handleEditTask(task.id)}>
                      <Pencil2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
