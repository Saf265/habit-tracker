"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CreateHabit } from "@/lib/actionHabit";
import { useState } from "react";

export default function CreateHabitForm() {
  const [frequencyValue, setFrequency] = useState("daily");

  const habitList = [
    { name: "Mon", value: "Monday" },
    { name: "Tue", value: "Tuesday" },
    { name: "Wed", value: "Wednesday" },
    { name: "Thu", value: "Thursday" },
    { name: "Fri", value: "Friday" },
    { name: "Sat", value: "Saturday" },
    { name: "Sun", value: "Sunday" },
  ];

  return (
    <section className="flex size-full min-h-[90vh] flex-1 flex-col items-center justify-center space-y-6 p-2">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <Breadcrumb className="self-start">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/my-habits">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/habitActions/add">Add</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle>Create a new habit</CardTitle>
            <CardDescription>
              Define your new habit and its frequency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => CreateHabit(new FormData(e.currentTarget))}
              className="w-full space-y-8"
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="habitName">Name of habit</Label>
                <Input
                  type="text"
                  id="habitName"
                  name="habit-name"
                  placeholder="ex: Meditation"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="habitDescription">Description (optional)</Label>
                <Textarea
                  id="habitDescription"
                  name="habit-description"
                  placeholder="Habit description"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="frequency">Frequency</Label>
                <RadioGroup
                  name="frequency"
                  id="frequency"
                  value={frequencyValue}
                  onValueChange={setFrequency}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      defaultChecked={true}
                      value="DAILY"
                      id="daily"
                    />
                    <Label htmlFor="daily">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="WEEKLY" id="weekly" />
                    <Label htmlFor="weekly">Weekly</Label>
                  </div>
                </RadioGroup>
              </div>
              {frequencyValue === "DAILY" && (
                <div className="flex flex-col space-y-3">
                  <Label>Days of week</Label>
                  <div className="flex w-full flex-wrap gap-5">
                    {habitList.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <Checkbox
                          name="dailyGoal"
                          id={item.value}
                          value={item.value}
                        />
                        <label
                          htmlFor={item.value}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {frequencyValue === "WEEKLY" && (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="weeklyGoal">Per week</Label>
                  <Input
                    id="weeklyGoal"
                    name="weeklyGoal"
                    min="1"
                    max="7"
                    placeholder="ex: 3"
                  />
                </div>
              )}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Activate reminder</Label>
                  <p>Receive a reminder for this habit.</p>
                </div>
                <Switch name="reminder" />
              </div>
              <Button className="w-full" type="submit">
                Create habit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
