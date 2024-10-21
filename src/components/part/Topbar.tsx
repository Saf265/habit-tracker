"use client";

import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Topbar() {
  const { user } = useUser();
  return (
    <div className="flex w-full items-center justify-around border-b px-2 py-3">
      <div className="flex items-center gap-2">
        <h2 className="font-medium">0 HABIT</h2>
        <Button variant="outline" size="icon" className="">
          <Link href="/habitActions/add">
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>
      <Avatar>
        <AvatarImage src={user?.imageUrl} alt="profile picture" />
        <AvatarFallback>{user?.firstName}</AvatarFallback>
      </Avatar>
    </div>
  );
}
