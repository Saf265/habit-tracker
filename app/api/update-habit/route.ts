import { prisma } from "@/lib/db"; // Assurez-vous d'importer votre client Prisma
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, completed } = await req.json();

    await prisma.habit.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json({ message: "Habit updated successfully" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'habitude :", error);
    return NextResponse.json(
      { error: "Failed to update habit" },
      { status: 500 }
    );
  }
}
