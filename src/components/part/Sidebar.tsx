"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BarChart2, Home, LogOut, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarItems = [
  { name: "Habit", icon: Home, href: "/dashboard/my-habits" },
  { name: "Statistics", icon: BarChart2, href: "/dashboard/stats" },
  { name: "Profile", icon: Settings, href: "/dashboard/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="left-4 top-4 z-50 flex md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="size-4" />
      </Button>
      <div
        className={cn(
          "block z-40 h-full w-64 bg-background border-r transition-transform duration-200 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold">Mon App</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.name}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 size-4" />
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-auto p-6">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/logout">
                <LogOut className="mr-2 size-4" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
