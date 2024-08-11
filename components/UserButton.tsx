// UserButton.js
"use client";
import React, { Suspense } from "react";
import Link from "next/link";
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
import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

const UserButton = () => {
  const { user, isLoading } = useUser();
  // console.log("User:", user);

  const handleLogout = () => {
    // Clear cookies and local storage
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to Auth0 logout endpoint
    window.location.href = "/api/auth/logout";
  };

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
      <DropdownMenuContent className="mr-4">
        <DropdownMenuItem>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/profile-client">Profile</a>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />{" "}
        <DropdownMenuItem onClick={handleLogout}>
          {/* <Link href="/api/auth/logout" className=""> */}
          <ExitIcon className="mr-2 h-4 w-4" />
          <span className="">Log Out</span>
          {/* </Link> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
