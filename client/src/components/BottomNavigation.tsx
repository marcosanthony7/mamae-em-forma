import { motion } from "framer-motion";
import { Home, Dumbbell, Salad, Activity, BookOpen, LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Início", icon: Home },
  { id: "treinos", label: "Treinos", icon: Dumbbell },
  { id: "alimentacao", label: "Alimentação", icon: Salad },
  { id: "diastase", label: "Diástase", icon: Activity },
  { id: "extras", label: "Extras", icon: BookOpen },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-card-border z-50 pb-safe">
      <div className="flex items-center justify-evenly h-16 sm:h-[72px] w-full px-2 sm:px-4 gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center min-w-0 flex-1 h-14 sm:h-16 rounded-lg sm:rounded-xl transition-colors"
              data-testid={`nav-${item.id}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-1 bg-gradient-to-br from-primary/15 to-accent/15 rounded-lg sm:rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors relative z-10 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 transition-colors truncate max-w-full px-0.5 relative z-10 ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
