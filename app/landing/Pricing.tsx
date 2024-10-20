"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

export default function Pricing() {
  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 px-8 py-24 text-center">
      <div className="flex flex-col space-y-2">
        <Badge variant="outline" className="mx-auto w-fit">
          PRICING
        </Badge>
        <h1 className="text-center text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
          Save time, master your habits
          <br /> reach your goals faster.
        </h1>
      </div>
      <Card className="w-full md:max-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Starter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-center gap-2">
            <span className="text-lg font-bold text-muted-foreground line-through">
              $30
            </span>
            <span className="text-5xl font-extrabold">$20</span>
            <span className="mb-1 text-lg font-bold text-muted-foreground">
              USD
            </span>
          </div>
          <ul className="space-y-2.5 text-left">
            {[
              "Daily Tracking",
              "In-Depth Progress Analysis",
              "Flexible Activity Scheduling",
              "Engaging Group Challenges",
              "Motivational Reward System",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="size-5 shrink-0 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" size="lg">
            Build Habit
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Pay once, access forever
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
