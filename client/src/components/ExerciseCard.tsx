import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  id: string;
  title: string;
  difficulty: "fácil" | "moderado" | "intenso";
  instructions: string;
  adaptations?: {
    normal?: string;
    cesarea?: string;
  };
  videoUrl?: string;
  completed?: boolean;
  selectedBirthType?: "all" | "normal" | "cesarea" | null;
  onComplete?: (id: string) => void;
}

const difficultyColors = {
  fácil: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  moderado: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  intenso: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ExerciseCard({
  id,
  title,
  difficulty,
  instructions,
  adaptations,
  videoUrl,
  completed = false,
  selectedBirthType = "all",
  onComplete,
}: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleComplete = () => {
    onComplete?.(id);
  };

  const handlePlay = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isCompleted = completed;

  return (
    <motion.div
      layout
      className={`rounded-lg sm:rounded-xl border ${
        isCompleted
          ? "bg-muted/50 border-muted"
          : "bg-card border-card-border"
      }`}
      data-testid={`exercise-card-${id}`}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <button
            onClick={handleComplete}
            className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
              isCompleted
                ? "bg-primary border-primary"
                : "border-muted-foreground/30 hover:border-primary"
            }`}
            data-testid={`checkbox-${id}`}
          >
            {isCompleted && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h4
                className={`font-medium text-sm sm:text-base ${
                  isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {title}
              </h4>
              <Badge variant="secondary" className={`text-[11px] sm:text-xs ${difficultyColors[difficulty]}`}>
                {difficulty}
              </Badge>
            </div>
            
            {adaptations && selectedBirthType && selectedBirthType !== "all" && (
              <div className={`mt-1.5 sm:mt-2 text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md inline-block ${
                selectedBirthType === "normal" 
                  ? "bg-accent/50 text-foreground" 
                  : "bg-primary/10 text-foreground"
              }`}>
                {selectedBirthType === "normal" && adaptations.normal && (
                  <span>{adaptations.normal}</span>
                )}
                {selectedBirthType === "cesarea" && adaptations.cesarea && (
                  <span>{adaptations.cesarea}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePlay}
              data-testid={`play-${id}`}
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
              data-testid={`expand-${id}`}
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground">{instructions}</p>
                
                {adaptations && (
                  <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                    {(selectedBirthType === "all" || selectedBirthType === null || selectedBirthType === "normal") && adaptations.normal && (
                      <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-accent/50">
                        <p className="text-[11px] sm:text-xs font-medium text-foreground mb-0.5 sm:mb-1">
                          Parto Normal:
                        </p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          {adaptations.normal}
                        </p>
                      </div>
                    )}
                    {(selectedBirthType === "all" || selectedBirthType === null || selectedBirthType === "cesarea") && adaptations.cesarea && (
                      <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-primary/10">
                        <p className="text-[11px] sm:text-xs font-medium text-foreground mb-0.5 sm:mb-1">
                          Cesárea:
                        </p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          {adaptations.cesarea}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
