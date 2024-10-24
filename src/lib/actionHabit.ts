"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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
  if (typeof id !== "number") {
    console.error("Error mais type");
  }

  if (!id) {
    console.error("L'id n'est pas la");
  }
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
  const id = Number(formData.get("id"));

  if (!id || isNaN(Number(id))) {
    throw new Error("Invalid or missing habit ID.");
  }

  const dailyGoal = formData.getAll("dailyGoal");

  console.log(habitName);
  console.log(habitDescription);
  console.log(frequency);
  console.log(dailyGoal);
  console.log(weeklyGoal);
  console.log(reminder);
  console.log(id + " is id" + "typeof " + typeof id);

  await prisma.habit.update({
    where: {
      id: id,
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
  try {
    const id = formData.get("id");
    const valueName = formData.get("valueName");

    if (!id || isNaN(Number(id))) {
      throw new Error("Invalid or missing habit ID.");
    }

    if (!valueName || typeof valueName !== "string") {
      throw new Error("Invalid or missing habit name.");
    }

    const habitData = await getHabitDataById(Number(id));

    if (habitData?.name === valueName) {
      console.log("ok");
      // Supprimer l'habitude et son historique dans une transaction
      await prisma.$transaction([
        prisma.historyHabit.deleteMany({
          where: { habitId: Number(id) },
        }),
        prisma.habit.deleteMany({
          where: { id: Number(id) },
        }),
      ]);
    } else {
      throw new Error("Habit not found or name does not match.");
    }
  } catch (err) {
    throw new Error(`Retry please, error: ${err}`);
  } finally {
    revalidatePath("/");
  }
};

export const handleUpdateHabit = async (completed: boolean, id: number) => {
  try {
    console.log("djzi");
    // const newCompletedStatus = !completed;
    console.log(id);
    // console.log(newCompletedStatus);

    await prisma.habit.update({
      where: { id },
      data: { completed: completed },
    });
    console.log("done");
  } catch (err) {
    throw new Error("error: " + err);
  } finally {
    revalidatePath("/");
  }
};

export const calculateStreak = async (
  habitId: number,
  userId: string
): Promise<number> => {
  const history = await prisma.historyHabit.findMany({
    where: {
      habitId: habitId,
      userId: userId,
    },
    orderBy: {
      date: "desc", // Trier par ordre décroissant, de la plus récente à la plus ancienne
    },
  });

  let streak = 0;

  // Parcours les entrées dans l'ordre décroissant (plus récente d'abord)
  for (const entry of history) {
    if (entry.completed) {
      streak++; // Incrémenter le streak si l'entrée est complétée
    } else {
      break; // Arrêter dès qu'une entrée non complétée est rencontrée
    }
  }

  return streak;
};
