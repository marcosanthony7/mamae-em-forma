import DashboardCard from "../DashboardCard";
import { Dumbbell, Salad, Activity, BookOpen, Wind } from "lucide-react";

export default function DashboardCardExample() {
  return (
    <div className="p-6 bg-background grid grid-cols-2 gap-4 max-w-md">
      <DashboardCard
        title="Treinos"
        subtitle="3 exercícios hoje"
        icon={Dumbbell}
        progress={60}
        variant="primary"
        onClick={() => console.log("Treinos clicked")}
      />
      <DashboardCard
        title="Alimentação"
        subtitle="Ver cardápio"
        icon={Salad}
        variant="accent"
        onClick={() => console.log("Alimentação clicked")}
      />
      <DashboardCard
        title="Diástase"
        subtitle="Fazer teste"
        icon={Activity}
        variant="secondary"
        onClick={() => console.log("Diástase clicked")}
      />
      <DashboardCard
        title="Extras"
        subtitle="Aulas e dicas"
        icon={BookOpen}
        variant="accent"
        onClick={() => console.log("Extras clicked")}
      />
    </div>
  );
}
