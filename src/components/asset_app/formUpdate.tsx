"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateHabit } from "@/lib/actionHabit";
import { useState } from "react";
import { successEdit } from "./ToastAsset";

type HabitDetails = {
  id: number;
  name: string;
  description: string | undefined;
  reminder: boolean;
  habitType: string;
  frequency: string | null;
  dayOfWeeks: number[]; // Tableau d'indices des jours de la semaine
};

export default function UpdateHabitForm({
  id,
  name,
  description,
  reminder,
  habitType,
  frequency,
  dayOfWeeks,
}: HabitDetails) {
  const [frequencyValue, setFrequency] = useState(habitType);
  const habitList = [
    { name: "Mon", index: 0 },
    { name: "Tue", index: 1 },
    { name: "Wed", index: 2 },
    { name: "Thu", index: 3 },
    { name: "Fri", index: 4 },
    { name: "Sat", index: 5 },
    { name: "Sun", index: 6 },
  ];

  return (
    <form
      action={updateHabit}
      onSubmit={successEdit}
      className="w-full space-y-8"
    >
      <input type="hidden" name="id" value={id} />
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="habitName">Name of habit</Label>
        <Input
          type="text"
          id="habitName"
          name="habit-name"
          defaultValue={name}
          placeholder="ex: Meditation"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="habitDescription">Description (optional)</Label>
        <Textarea
          id="habitDescription"
          name="habit-description"
          placeholder="Habit description"
          defaultValue={description}
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="frequency">Frequency</Label>
        <RadioGroup
          onValueChange={setFrequency}
          defaultValue={frequencyValue}
          name="frequency"
          id="frequency"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              defaultChecked={frequencyValue === "DAILY" ? true : false}
              value="DAILY"
              id="daily"
            />
            <Label htmlFor="daily">Daily</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              defaultChecked={frequencyValue === "WEEKLY" ? true : false}
              value="WEEKLY"
              id="weekly"
            />
            <Label htmlFor="weekly">Weekly</Label>
          </div>
        </RadioGroup>
      </div>
      {frequencyValue === "DAILY" && (
        <div id="daily-section">
          <Label>Days of week</Label>
          <div className="flex w-full flex-wrap gap-5">
            {habitList.map((item) => (
              <div
                key={item.index}
                className="flex flex-row items-start space-x-2 space-y-0"
              >
                <Checkbox
                  name="dailyGoal"
                  id={`day-${item.index}`}
                  value={item.index.toString()}
                  defaultChecked={dayOfWeeks.includes(item.index)}
                />
                <label
                  htmlFor={`day-${item.index}`}
                  className="text-sm font-medium leading-none"
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {frequencyValue === "WEEKLY" && (
        <div id="weekly-section" style={{ display: "block" }}>
          <Label htmlFor="weeklyGoal">Per week</Label>
          <Input
            id="weeklyGoal"
            name="weeklyGoal"
            min="1"
            max="7"
            placeholder="ex: 3"
            defaultValue={frequency ?? undefined}
          />
        </div>
      )}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">Activate reminder</Label>
          <p>Receive a reminder for this habit.</p>
        </div>
        <Switch name="reminder" defaultChecked={reminder} />
      </div>
      <Button className="w-full" type="submit">
        Edit habit
      </Button>
    </form>
  );
}
