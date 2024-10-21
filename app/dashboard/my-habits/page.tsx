import HabitsLayout from "@/components/asset_app/HabitLayout";
import { getUser } from "@/lib/actionUser";
import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { addUserToDatabase } from "../../../services/userService";

export default async function HabitPage() {
  const { userId } = auth();

  const user = await currentUser();

  if (!userId) {
    redirect("/");
  }

  const userDb = await getUser(userId);

  const allUserHabit = await prisma.habit.findMany({
    where: {
      userId: userDb?.id,
    },
  });

  if (userId && user) {
    const fullName = `${user.firstName} ${user.lastName}`;
    const email = user.emailAddresses[0]?.emailAddress ?? "";
    const image = user.imageUrl ?? "";
    await addUserToDatabase(userId, fullName, email, image);
  }
  return (
    <div>
      HabitPage
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {allUserHabit.map((item, index) => (
          <HabitsLayout
            key={index}
            id={item?.id}
            name={item.name}
            completed={item.completed}
            description={item?.description ?? ""}
            streak={item?.streak ?? 0}
            lastCompleted=""
            frequency={item?.frequency ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
