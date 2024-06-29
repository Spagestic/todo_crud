"use client";
import React from "react";
import { deleteTask } from "@/lib/actions/task.actions";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface DeleteTaskProps {
  id: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id }) => {
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };
  return (
    <Button onClick={() => handleDeleteTask(id)}>
      <TrashIcon />
    </Button>
  );
};

export default DeleteTask;
