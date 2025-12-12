import { useState } from "react";
import { motion } from "framer-motion";

const days = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
  { id: "sab", label: "Sáb" },
  { id: "dom", label: "Dom" },
];

interface WeeklyMealTabsProps {
  activeDay: string;
  onDayChange: (day: string) => void;
}

export default function WeeklyMealTabs({ activeDay, onDayChange }: WeeklyMealTabsProps) {
  return (
    <div className="flex gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-muted rounded-lg sm:rounded-xl overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
      {days.map((day) => (
        <button
          key={day.id}
          onClick={() => onDayChange(day.id)}
          className={`relative flex-1 min-w-[40px] sm:min-w-[48px] py-1.5 sm:py-2 px-2 sm:px-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeDay === day.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-testid={`tab-${day.id}`}
        >
          {activeDay === day.id && (
            <motion.div
              layoutId="activeDay"
              className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 rounded-md sm:rounded-lg"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{day.label}</span>
        </button>
      ))}
    </div>
  );
}
