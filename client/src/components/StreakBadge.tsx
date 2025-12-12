import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakBadgeProps {
  streak: number;
  animate?: boolean;
}

export default function StreakBadge({ streak, animate = true }: StreakBadgeProps) {
  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
    >
      <motion.div
        animate={animate ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
      </motion.div>
      <span className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap">
        {streak} dias
      </span>
    </motion.div>
  );
}
