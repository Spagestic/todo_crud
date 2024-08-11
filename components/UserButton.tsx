// UserButton.js
"use client";
import React, { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

const UserButton = () => {
  const { user, isLoading } = useUser();
  // console.log("User:", user);

  if (isLoading || !user) {
    return <Skeleton className="w-8 h-8 rounded-full mx-2" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <PersonIcon className="" />
          {/* <Image
            src={user.picture}
            alt={"User profile picture"}
            width={32}
            height={32}
            className="rounded-full"
          /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/profile-client">Profile</a>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/api/auth/logout">Log Out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
