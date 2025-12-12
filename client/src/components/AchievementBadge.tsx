import { motion } from "framer-motion";
import { Lock, LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  id: string;
  title: string;
  icon: LucideIcon;
  unlocked: boolean;
  onClick?: (id: string) => void;
}

export default function AchievementBadge({
  id,
  title,
  icon: Icon,
  unlocked,
  onClick,
}: AchievementBadgeProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(id)}
      className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[64px] sm:min-w-[80px]"
      data-testid={`achievement-${id}`}
    >
      <div
        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
          unlocked
            ? "bg-gradient-to-br from-primary to-chart-2"
            : "bg-muted"
        }`}
      >
        {unlocked ? (
          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
        ) : (
          <>
            <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground/30" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-full">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </div>
          </>
        )}
        {unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-primary/20"
          />
        )}
      </div>
      <span
        className={`text-[11px] sm:text-xs text-center font-medium max-w-[64px] sm:max-w-[80px] line-clamp-2 ${
          unlocked ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {title}
      </span>
    </motion.button>
  );
}
