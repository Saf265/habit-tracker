import UpdateHabitForm from "@/components/asset_app/formUpdate";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHabitDataById } from "@/lib/actionHabit";

export default async function UpdateHabitFormPage({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  const habitData = await getHabitDataById(Number(searchParams.id));

  if (!habitData) {
    return null;
  }

  return (
    <section className="flex size-full min-h-[90vh] flex-1 flex-col items-center justify-center space-y-6 p-2">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <Breadcrumb className="self-start">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/my-habits">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/habitActions/edit">Edit</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle>Edit your habit</CardTitle>
            <CardDescription>
              Redefine your habit and its frequency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateHabitForm
              id={Number(habitData?.id)}
              name={habitData?.name}
              description={habitData?.description ?? ""}
              reminder={habitData?.reminder}
              habitType={habitData?.habitType}
              frequency={habitData?.frequency}
              dayOfWeeks={habitData?.dayOfWeeks}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
