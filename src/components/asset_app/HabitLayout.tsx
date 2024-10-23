"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import * as React from "react";
import BtnEdit from "./BtnEdit";

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

  const deleteHabit = (id: number) => {
    // Logique pour supprimer une habitude
    console.log(`Supprimer l'habitude ${id}`);
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
              <div>
                <BtnEdit id={id} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteHabit(id)}
                >
                  <Trash2 className="mr-1 size-4" /> Supprimer
                </Button>
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
