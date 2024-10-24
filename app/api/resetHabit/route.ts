// /app/api/resetHabit/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 1. Récupérer toutes les habitudes actuelles
    const habits = await prisma.habit.findMany();

    // 2. Créer une nouvelle entrée dans HistoryHabit pour chaque habitude
    const historyData = habits.map((habit) => ({
      userId: habit.userId,
      habitId: habit.id,
      completed: habit.completed,
    }));

    await prisma.historyHabit.createMany({
      data: historyData,
    });

    // 3. Réinitialiser les habitudes (mettre completed à false)
    await prisma.habit.updateMany({
      data: { completed: false },
    });

    return NextResponse.json({
      message: "Habits have been reset and history saved!",
    });
  } catch (error) {
    console.error("Error resetting habits or saving history:", error);
    return NextResponse.json(
      { error: "Failed to reset habits or save history" },
      { status: 500 }
    );
  }
}
