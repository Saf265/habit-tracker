"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteHabit } from "@/lib/actionHabit";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { successDelete } from "./ToastAsset";

type HabitProps = {
  id: number;
  name: string;
  description: string | undefined;
  frequency: string;
  streak: number;
  completed: boolean;
  lastCompleted: string | null;
};

export default function HabitsLayout({
  id,
  name,
  description,
  frequency,
  streak,
  completed,
  lastCompleted,
}: HabitProps) {
  const [expandedHabit, setExpandedHabit] = React.useState<number | null>(null);
  const [isCompleted, setCompleted] = React.useState(completed);

  const handleCheckboxChange = async () => {
    const newCompletedStatus = !isCompleted;
    setCompleted(newCompletedStatus);

    try {
      const response = await fetch("/api/update-habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed: newCompletedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update habit");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'habitude :", error);
      // Revert state if update fails
      setCompleted(!newCompletedStatus);
    }
  };

  return (
    <Collapsible
      key={id}
      open={expandedHabit === id}
      onOpenChange={() => setExpandedHabit(expandedHabit === id ? null : id)}
    >
      {/** */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                defaultChecked={completed}
                onCheckedChange={handleCheckboxChange}
              />
              <h3
                className={`text-xl ${
                  completed ? "text-muted-foreground line-through" : ""
                }`}
              >
                {name}
              </h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {expandedHabit === id ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="p-4 pt-0">
            <p className="mb-2 text-sm text-muted-foreground">{description}</p>
            <p className="mb-2 text-sm">Fréquence : {frequency}</p>
            <p className="mb-4 text-sm">Série actuelle : {streak} jours</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Link
                  href={{
                    pathname: `/habitActions/edit`,
                    query: {
                      id: id,
                    },
                  }}
                >
                  <Button variant="outline" size="sm" className="mr-2">
                    <Edit className="mr-1 size-4" /> Edit 2, id: {Number(id)}
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 color="white" /> Remove
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Remove your habit</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form
                      action={successDelete}
                      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        deleteHabit(new FormData(event.currentTarget));
                      }}
                      className="flex flex-col space-y-5"
                    >
                      <input type="hidden" name="id" value={id} />
                      <div className="flex flex-col items-start gap-1.5">
                        <Label htmlFor="valueName" className="text-right">
                          Type <strong>{name}</strong> to remove it
                        </Label>
                        <Input
                          id="valueName"
                          name="valueName"
                          className="col-span-3"
                          required
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit">Confirm</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-sm text-muted-foreground">
                {lastCompleted
                  ? `Dernière complétion : ${lastCompleted}`
                  : "Pas encore complété"}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
