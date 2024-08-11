// task.tsx
"use client";
import React from "react";
import { useState } from "react";
import ToggleTaskCheckbox from "./ToggleTaskCheckbox";
import DeleteTask from "./DeleteTask";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { updateTaskTitle, updateTaskTime } from "@/lib/actions/task.actions";
import { CheckIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { DateTimePicker } from "../ui/datetime-picker";

interface TaskProps {
  id: string;
  title: string;
  time: Date;
  completed: boolean;
}

export const Task = ({ id, title, time, completed }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ title, time });

  const handleUpdateTitle = () => {
    updateTaskTitle(id, taskDetails.title);
    setIsEditing(false);
  };

  const handleUpdateTime = () => {
    updateTaskTime(id, taskDetails.time);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateTitle();
    } else if (e.key === "Escape") {
      setTaskDetails({ title, time });
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-background border border-input rounded-md px-4 py-2">
      <div className="w-full flex items-center gap-4">
        <ToggleTaskCheckbox id={id} toggle={completed} />
        {isEditing ? (
          <div className="w-full flex mr-4 gap-2">
            <Input
              type="text"
              value={taskDetails.title}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, title: e.target.value })
              }
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full border-2 border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <DateTimePicker
              // hourCycle={24}
              value={taskDetails.time}
              onChange={(value) =>
                setTaskDetails({
                  ...taskDetails,
                  // @ts-ignore
                  time: value,
                })
              }
            />
          </div>
        ) : (
          <p
            className={`w-full pr-6 text-lg flex flex-col justify-between ${
              completed ? "line-through" : ""
            }`}
          >
            <span className="text-sm">{title}</span>
            <span className="text-xs text-gray-600">
              Due on {time?.toLocaleDateString()} at{" "}
              {time?.toLocaleTimeString()}
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
                handleUpdateTitle();
                handleUpdateTime();
              }}
            >
              <CheckIcon className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => {
                setTaskDetails({ title, time });
                setIsEditing(false);
              }}
            >
              <Cross2Icon className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="icon" onClick={() => setIsEditing(true)}>
              <Pencil2Icon className="w-4 h-4" />
            </Button>
            <DeleteTask id={id} />
          </>
        )}
      </div>
    </div>
  );
};
