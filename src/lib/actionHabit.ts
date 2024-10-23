"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "./actionUser";
import { prisma } from "./db";
export const CreateHabit = async (formData: FormData) => {
  const { userId } = auth();

  const habitName = formData.get("habit-name") as string;
  const habitDescription = formData.get("habit-description") as string;
  const frequency = formData.get("frequency") as string;
  const weeklyGoal = frequency === "WEEKLY" ? formData.get("weeklyGoal") : null;
  const reminder = formData.has("reminder");

  // Récupération des jours de la semaine
  const dailyGoal = formData
    .getAll("dailyGoal")
    .map((day) => {
      switch (day) {
        case "Monday":
          return 0;
        case "Tuesday":
          return 1;
        case "Wednesday":
          return 2;
        case "Thursday":
          return 3;
        case "Friday":
          return 4;
        case "Saturday":
          return 5;
        case "Sunday":
          return 6;
        default:
          return NaN; // Valeur par défaut si le jour n'est pas reconnu
      }
    })
    .filter((day) => !isNaN(day)); // Filtrer les NaN

  console.log(habitName);
  console.log(habitDescription);
  console.log(frequency);
  console.log(weeklyGoal);
  console.log(reminder);
  console.log(userId);

  if (!userId) {
    return null;
  }

  const user = await getUser(userId);

  await prisma.habit.create({
    data: {
      userId: user?.id as string,
      habitType: frequency === "DAILY" ? "DAILY" : "WEEKLY",
      reminder: reminder,
      name: habitName,
      description: habitDescription,
      dayOfWeeks: frequency === "DAILY" ? dailyGoal : undefined,
      frequency: weeklyGoal as string | null,
    },
  });

  redirect("/dashboard/my-habits");
};

export const getHabitDataById = async (id: number) => {
  const habit = await prisma.habit.findUnique({
    where: {
      id: id,
    },
  });

  return habit;
};

export const updateHabit = async (formData: FormData) => {
  const habitName = formData.get("habit-name") as string;
  const habitDescription = formData.get("habit-description") as string;
  const frequency = formData.get("frequency") as string;
  const weeklyGoal = frequency === "WEEKLY" ? formData.get("weeklyGoal") : null;
  const reminder = formData.has("reminder");
  const id = formData.get("id");

  const dailyGoal = formData.getAll("dailyGoal");

  console.log(habitName);
  console.log(habitDescription);
  console.log(frequency);
  console.log(dailyGoal);
  console.log(weeklyGoal);
  console.log(reminder);
  console.log(id);

  await prisma.habit.update({
    where: {
      id: Number(id),
    },
    data: {
      habitType: frequency === "DAILY" ? "DAILY" : "WEEKLY",
      reminder: reminder,
      name: habitName,
      description: habitDescription,
      dayOfWeeks:
        frequency === "DAILY" ? dailyGoal.map((day) => Number(day)) : undefined,
      frequency: weeklyGoal as string | null,
    },
  });

  redirect("/dashboard/my-habits");
};

export const deleteHabit = async (formData: FormData) => {
  const id = formData.get("id");
  const valueName = formData.get("valueName");

  console.log(id);
  console.log(valueName);

  const habitData = await getHabitDataById(Number(id));

  if (habitData?.name === valueName) {
    await prisma.habit.delete({
      where: {
        id: Number(id),
      },
    });
  } else {
    return null;
  }
};
