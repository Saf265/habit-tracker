"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import * as React from "react";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
  streak: number;
}

export default function HabitTrackerDemo() {
  const [habits, setHabits] = React.useState<Habit[]>([
    { id: 1, name: "Méditer", completed: false, streak: 0 },
    { id: 2, name: "Faire de l'exercice", completed: false, streak: 0 },
    { id: 3, name: "Lire 20 pages", completed: false, streak: 0 },
  ]);

  const toggleHabit = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: habit.completed ? habit.streak : habit.streak + 1,
            }
          : habit
      )
    );
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Démo Trackeuse d'Habitudes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center">
            Cliquez sur une habitude pour la marquer comme complétée et voir
            votre progression !
          </p>
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-3"
              onClick={() => toggleHabit(habit.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                {habit.completed ? (
                  <CheckCircle className="mr-2 size-6 text-green-500" />
                ) : (
                  <Circle className="mr-2 size-6 text-gray-400" />
                )}
                <span
                  className={
                    habit.completed ? "text-gray-500 line-through" : ""
                  }
                >
                  {habit.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm font-semibold">
                  Série : {habit.streak}
                </span>
                {habit.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white"
                  >
                    +1
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
      <Button
        onClick={() =>
          setHabits(habits.map((habit) => ({ ...habit, completed: false })))
        }
        className="w-full"
      >
        Réinitialiser la démo
      </Button>
    </div>
  );
}
