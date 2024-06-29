import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { updateTaskTitle } from "@/lib/actions/task.actions";
import { Input } from "@/components/ui/input";

interface EditTaskInputProps {
  id: string;
  defaultValue: string;
}

const EditTaskInput: React.FC<EditTaskInputProps> = ({ id, defaultValue }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = useCallback(
    debounce((value: string) => {
      updateTaskTitle(id, value);
      setIsEditing(false); // Update the isEditing state to false after updating the task title
    }, 300),
    [id]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate(e.currentTarget.value);
    } else if (e.key === "Escape") {
      setIsEditing(false); // Optionally, reset isEditing when escape is pressed without saving
      // Logic to reset the input value to defaultValue might also be needed here
    }
  };

  return (
    <Input
      type="text"
      defaultValue={defaultValue}
      onBlur={(e) => handleUpdate(e.target.value)}
      onKeyDown={handleKeyDown}
      autoFocus // Automatically focus when the component is rendered
      className="w-full border-2 border-input rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
};

export default EditTaskInput;
