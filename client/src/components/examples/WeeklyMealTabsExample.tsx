import { useState } from "react";
import WeeklyMealTabs from "../WeeklyMealTabs";

export default function WeeklyMealTabsExample() {
  const [activeDay, setActiveDay] = useState("seg");

  return (
    <div className="p-6 bg-background max-w-md">
      <WeeklyMealTabs activeDay={activeDay} onDayChange={setActiveDay} />
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Dia selecionado: <span className="font-medium text-foreground">{activeDay}</span>
      </p>
    </div>
  );
}
