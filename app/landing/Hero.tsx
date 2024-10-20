"use client";

import HabitTrackerDemo from "@/components/asset_app/HabitDemo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] w-full items-center justify-center bg-background">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-start">
          <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
            <span className="underline decoration-primary">Build habits</span>{" "}
            that keep <br />
            them{" "}
            <span className="underline decoration-primary">coming back</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Offer something useful, interesting, or entertaining right away.
            <br />
            This could be a helpful resource, a captivating article, or a
            visually appealing design.
          </p>
          <div className="mt-5 flex items-center justify-start gap-3">
            <Link href="https://discord.gg/rZDgKHqJ" target="_blank" passHref>
              <Button variant="outline" className="w-52 sm:w-64">
                Discord server
              </Button>
            </Link>
          </div>
        </div>
        <HabitTrackerDemo />
      </div>
    </section>
  );
}
