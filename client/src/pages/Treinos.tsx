import { motion } from "framer-motion";
import { ChevronLeft, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressRing from "@/components/ProgressRing";
import { useProgress, useExercises, useToggleExercise, useSetBirthType } from "@/hooks/useProgress";

type BirthType = "all" | "normal" | "cesarea";

interface TreinosProps {
  onBack?: () => void;
}

export default function Treinos({ onBack }: TreinosProps) {
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: exercises, isLoading: exercisesLoading } = useExercises();
  const toggleExercise = useToggleExercise();
  const setBirthType = useSetBirthType();

  if (progressLoading || exercisesLoading || !progress || !exercises) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentDay = progress.currentDay;
  const completedExercises = new Set(progress.completedExercises);
  const birthTypeFilter: BirthType = progress.birthType || "all";

  const handleComplete = (id: string) => {
    toggleExercise.mutate(id);
  };

  const handleBirthTypeChange = (type: BirthType) => {
    if (type === "all") {
      setBirthType.mutate(null);
    } else {
      setBirthType.mutate(type);
    }
  };

  const exerciseProgress = Math.round((completedExercises.size / exercises.length) * 100);

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {onBack && (
              <Button size="icon" variant="ghost" onClick={onBack} data-testid="btn-back" className="flex-shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">Treino do Dia {currentDay}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{exercises.length} exercícios</p>
            </div>
          </div>
          <ProgressRing progress={exerciseProgress} size={44} strokeWidth={4}>
            <span className="text-[10px] sm:text-xs font-semibold">{exerciseProgress}%</span>
          </ProgressRing>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-1.5 sm:gap-2 pb-1">
            {[
              { value: "all", label: "Todos" },
              { value: "normal", label: "Parto Normal" },
              { value: "cesarea", label: "Cesárea" },
            ].map((option) => (
              <Badge
                key={option.value}
                variant={birthTypeFilter === option.value || (birthTypeFilter === null && option.value === "all") ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap text-xs ${
                  birthTypeFilter === option.value || (birthTypeFilter === null && option.value === "all")
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleBirthTypeChange(option.value as BirthType)}
                data-testid={`filter-${option.value}`}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24 space-y-3 sm:space-y-4">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ExerciseCard
                id={exercise.id}
                title={exercise.title}
                difficulty={exercise.difficulty}
                instructions={exercise.instructions}
                adaptations={exercise.adaptations}
                videoUrl={exercise.videoUrl}
                completed={completedExercises.has(exercise.id)}
                selectedBirthType={birthTypeFilter}
                onComplete={handleComplete}
              />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
