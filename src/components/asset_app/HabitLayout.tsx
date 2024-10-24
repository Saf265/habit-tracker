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
import { calculateStreak, deleteHabit, handleUpdateHabit } from "@/lib/actionHabit";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { successDelete } from "./ToastAsset";

type HabitProps = {
  id: number;
  name: string;
  description: string | undefined;
  frequency: string;
  streak: number;
  completed: boolean;
  lastCompleted: string | null;
  userId: string; // Assurez-vous que userId est passé en tant que prop
};

export default function HabitsLayout({
  id,
  name,
  description,
  frequency,
  streak,
  completed,
  lastCompleted,
  userId,
}: HabitProps) {
  const [expandedHabit, setExpandedHabit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(completed ? true : false);
  const [currentStreak, setCurrentStreak] = useState(streak); // État pour le streak

  const handleCheckbox = async (checked: boolean, id: number) => {
    try {
      setLoading(true);
      setCompleted(checked);
      await handleUpdateHabit(Boolean(checked), id);
    } catch (err) {
      throw new Error(`error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStreak = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const calculatedStreak = await calculateStreak(id, userId); // Calculer le streak
        setCurrentStreak(calculatedStreak); // Mettre à jour l'état avec le streak calculé
      } catch (error) {
        console.error("Erreur lors du calcul du streak:", error);
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    };

    fetchStreak();
  }, [id, userId]); // Dépendances pour re-calculer le streak si l'ID de l'habitude ou l'utilisateur change

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
              {loading ? (
                <ReloadIcon className="mr-2 size-4 animate-spin" />
              ) : (
                <Checkbox
                  defaultChecked={isCompleted}
                  onCheckedChange={(checked) =>
                    handleCheckbox(Boolean(checked), id)
                  }
                />
              )}
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
            <p className="mb-2 text-sm">Frequency : {frequency}</p>
            <p className="mb-4 text-sm">
              Current Streak : {loading ? "Chargement..." : `${currentStreak} jours`}
            </p>
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
                    <Edit className="mr-1 size-4" /> Edit
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
