import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  progress?: number;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const variantStyles = {
  primary: "from-primary/20 to-primary/5 border-primary/20",
  secondary: "from-chart-3/20 to-chart-3/5 border-chart-3/20",
  accent: "from-accent to-accent/50 border-accent-border",
};

const iconStyles = {
  primary: "bg-primary/20 text-primary",
  secondary: "bg-chart-3/20 text-chart-3",
  accent: "bg-primary/15 text-primary",
};

export default function DashboardCard({
  title,
  subtitle,
  icon: Icon,
  progress,
  variant = "primary",
  onClick,
}: DashboardCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full min-w-0 p-2.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${variantStyles[variant]} border text-left hover-elevate active-elevate-2 overflow-hidden`}
      data-testid={`card-dashboard-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className={`inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl ${iconStyles[variant]} mb-2 sm:mb-3`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </div>
      <h3 className="font-semibold text-foreground text-xs sm:text-sm md:text-base truncate">{title}</h3>
      {subtitle && (
        <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2 break-words">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-2 sm:mt-3">
          <div className="h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
            />
          </div>
          <p className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground mt-0.5 sm:mt-1">{progress}% completo</p>
        </div>
      )}
    </motion.button>
  );
}
