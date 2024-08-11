// task.tsx
"use client";
import React from "react";
import { useState } from "react";
import ToggleTaskCheckbox from "./ToggleTaskCheckbox";
import DeleteTask from "./DeleteTask";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { updateTaskTitle } from "@/lib/actions/task.actions";
import { CheckIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";

interface TaskProps {
  id: string;
  title: string;
  time: Date;
  completed: boolean;
}

export const Task = ({ id, title, time, completed }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (value: string) => {
    if (
      value !== title &&
      value.trim().length > 0 &&
      value.trim().length <= 100
    ) {
      updateTaskTitle(id, value);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim(); // Trim whitespace from both ends of the string
    if (e.key === "Enter" && value) {
      handleUpdate(e.currentTarget.value);
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };
  return (
    <div
      key={id}
      className="flex items-center justify-between bg-background border border-input rounded-md px-4 py-2"
    >
      <div className="w-full flex items-center gap-4">
        <ToggleTaskCheckbox id={id} toggle={completed} />
        {isEditing ? (
          <Input
            type="text"
            defaultValue={title}
            onBlur={(e) => handleUpdate(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus // Automatically focus when the component is rendered
            className="w-full border-2 border-input rounded-md mr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <p
            className={`w-full pr-6 text-lg flex flex-col justify-between ${
              completed ? "line-through" : ""
            }`}
          >
            <span>{title}</span>
            <span className="text-xs text-gray-500">
              Due on {time.toLocaleDateString()} at {time.toLocaleTimeString()}
              {/* Show how many days/time left */}
            </span>
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="icon"
              onClick={() => {
                console.log("Check Task:", id);
                setIsEditing(false);
              }}
            >
              <CheckIcon className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => {
                // console.log("Cross Task:", id);
                setIsEditing(false);
              }}
            >
              <Cross2Icon className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              onClick={() => {
                // console.log("Edit Task:", id);
                setIsEditing(true);
              }}
            >
              <Pencil2Icon className="w-4 h-4" />
            </Button>
            <DeleteTask id={id} />
          </>
        )}
      </div>
    </div>
  );
};
