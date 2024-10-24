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

  if (userId && user) {
    const fullName = `${user.firstName} ${user.lastName}`;
    const email = user.emailAddresses[0]?.emailAddress ?? "";
    const image = user.imageUrl ?? "";
    await addUserToDatabase(userId, fullName, email, image);
  }

  const allUserHabitDaily = await prisma.habit.findMany({
    where: {
      AND: [{ userId: userDb?.id }, { habitType: "DAILY" }],
    },
  });

  const allUserHabitWeekly = await prisma.habit.findMany({
    where: {
      AND: [{ userId: userDb?.id }, { habitType: "WEEKLY" }],
    },
  });

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {allUserHabitDaily.map((item, index) => (
            <HabitsLayout
              key={index}
              id={item?.id}
              name={item.name}
              completed={item.completed}
              description={item?.description ?? ""}
              streak={item?.streak ?? 0}
              lastCompleted=""
              frequency={item?.frequency ?? ""}
              userId={item?.userId}
            />
          ))}
        </div>
        <div className="my-5 flex w-full items-center gap-1">
          <div className="h-px grow bg-border text-foreground" />
          <span className="px-2 text-lg font-medium text-foreground">
            WEEKLY
          </span>
          <div className="h-px grow bg-border text-foreground" />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {allUserHabitWeekly.map((item, index) => (
            <HabitsLayout
              key={index}
              id={item?.id}
              name={item.name}
              completed={item.completed}
              description={item?.description ?? ""}
              streak={item?.streak ?? 0}
              lastCompleted=""
              frequency={item?.frequency ?? ""}
              userId={item?.userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
