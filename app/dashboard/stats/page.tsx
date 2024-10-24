"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Award, TrendingUp, Zap } from "lucide-react";

export default function StatsPage() {
  const cardProps = [
    { icon: Activity, name: "Current frequency", value: "12" },
    { icon: Award, name: "Completed habit", value: "12" },
    { icon: Zap, name: "Completion rate", value: "12" },
    { icon: TrendingUp, name: "Best Streak", value: "12" },
  ];
  return (
    <section>
      <Card>
        <CardHeader className="w-full text-center">
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {cardProps.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="size-6" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-700">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
