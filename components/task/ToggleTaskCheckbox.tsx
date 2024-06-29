"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleTask } from "@/lib/actions/task.actions";

interface ToggleTaskCheckboxProps {
  id: string;
  toggle: boolean;
}
export default function ToggleTaskCheckbox({
  id,
  toggle,
}: ToggleTaskCheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(toggle);

  const handle = async () => {
    try {
      setIsChecked(!isChecked);
      await toggleTask(id);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return <Checkbox id={id} checked={isChecked} onCheckedChange={handle} />;
}
