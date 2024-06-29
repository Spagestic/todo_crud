import React from "react";
import ModeToggle from "@/components/ModeToggle";
import UserButton from "@/components/UserButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import CreateTaskInput from "@/components/task/CreateTaskInput";
import { getTasks } from "@/lib/actions/task.actions";
import { Task } from "@/components/task/task";
import { createUser, getUser } from "@/lib/actions/user.actions";
import { getSession } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(async function Home() {
  // Get the user session
  const session = await getSession();
  const authUser = session?.user;
  // console.log("User:", authUser);

  // get user by email and create user if not exists
  let user = await getUser(authUser?.email);
  if (!user) {
    user = await createUser({
      name: authUser?.name,
      email: authUser?.email,
    });
  }
  // console.log("User:", user);

  // Fetch all tasks
  let tasks = await getTasks(user._id);
  // console.log("Tasks:", tasks);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">To-Do App</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </header>
      <main className="flex-1 p-6">
        <CreateTaskInput userId={user._id.toString("hex") as string} />
        <div className="space-y-2">
          {
            // @ts-ignore
            tasks.map((task: any) => (
              <Task
                key={task._id.toString("hex")}
                id={task._id.toString("hex")}
                title={task.title}
                completed={task.completed}
              />
            ))
          }
        </div>
      </main>
    </div>
  );
});
