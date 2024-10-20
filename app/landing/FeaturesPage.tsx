"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="size-6 text-green-500" />,
    title: "Suivi quotidien",
    description:
      "Marquez facilement vos habitudes comme complétées chaque jour.",
  },
  {
    icon: <TrendingUp className="size-6 text-blue-500" />,
    title: "Analyse des progrès",
    description:
      "Visualisez vos progrès avec des graphiques et des statistiques détaillées.",
  },
  {
    icon: <Calendar className="size-6 text-purple-500" />,
    title: "Planification flexible",
    description:
      "Définissez des habitudes quotidiennes, hebdomadaires ou personnalisées.",
  },
  {
    icon: <Bell className="size-6 text-yellow-500" />,
    title: "Rappels personnalisés",
    description:
      "Recevez des notifications pour ne jamais oublier vos habitudes.",
  },
  {
    icon: <Users className="size-6 text-indigo-500" />,
    title: "Défis de groupe",
    description: "Participez à des défis avec vos amis pour rester motivé.",
  },
  {
    icon: <Zap className="size-6 text-orange-500" />,
    title: "Système de récompenses",
    description: "Gagnez des points et des badges en atteignant vos objectifs.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Fonctionnalités de notre Habit Tracker
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-xl text-gray-500">
            Découvrez comment notre application peut vous aider à construire et
            maintenir de bonnes habitudes.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
          >
            Commencer gratuitement
          </a>
        </motion.div>
      </div>
    </div>
  );
}
