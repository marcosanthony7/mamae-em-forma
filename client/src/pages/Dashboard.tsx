import { motion } from "framer-motion";
import { Star, Flame, Target, Trophy, Loader2, Crown, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProgressRing from "@/components/ProgressRing";
import MotivationalQuote from "@/components/MotivationalQuote";
import DashboardCard from "@/components/DashboardCard";
import StreakBadge from "@/components/StreakBadge";
import AchievementBadge from "@/components/AchievementBadge";
import { Dumbbell, Salad, Activity, BookOpen, Wind } from "lucide-react";
import { useProgress, useExercises } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { useAuth as useFirebaseAuth } from "@/contexts/AuthContext";
import { motivationalQuotes } from "@shared/schema";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const iconMap: Record<string, LucideIcon> = {
  Star,
  Flame,
  Target,
  Trophy,
  Crown,
};

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: exercises } = useExercises();
  const { user } = useAuth();
  const { logout } = useFirebaseAuth();

  if (progressLoading || !progress) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentDay = progress.currentDay;
  const streak = progress.streak;
  const percentProgress = Math.round((currentDay / 30) * 100);
  const todayQuote = motivationalQuotes[currentDay % motivationalQuotes.length];
  
  const completedToday = progress.completedExercises.length;
  const totalExercises = exercises?.length || 6;
  const exerciseProgress = Math.round((completedToday / totalExercises) * 100);
  
  const cyclesCompleted = progress.cyclesCompleted || 0;
  const userName = user?.firstName || "Mamãe";
  const userInitials = user?.firstName?.charAt(0) || "M";

  return (
    <ScrollArea className="h-full w-full">
      <div className="px-3 sm:px-4 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6 w-full max-w-full box-border">
        <header className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Olá,</p>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">{userName}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <StreakBadge streak={streak} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" data-testid="btn-user-menu">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl || undefined} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {cyclesCompleted > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-sm text-muted-foreground flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      {cyclesCompleted} {cyclesCompleted === 1 ? 'ciclo completo' : 'ciclos completos'}
                    </div>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem 
                  onClick={() => logout()}
                  data-testid="btn-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-4 sm:py-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/30 via-primary/10 to-chart-3/10"
        >
          {cyclesCompleted > 0 && (
            <div className="flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary" data-testid="badge-cycles-completed">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {cyclesCompleted}º ciclo completo
              </span>
            </div>
          )}
          <ProgressRing progress={percentProgress} size={140}>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">Dia {currentDay}</span>
              <p className="text-xs sm:text-sm text-muted-foreground">de 30</p>
            </div>
          </ProgressRing>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground text-center px-4">
            Você está {percentProgress}% do caminho!
          </p>
        </motion.div>

        <MotivationalQuote quote={todayQuote.quote} author={todayQuote.author} />

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Conquistas</h2>
          <ScrollArea className="w-full -mx-3 sm:-mx-4 px-3 sm:px-4">
            <div className="flex gap-3 sm:gap-4 pb-3 sm:pb-4">
              {progress.achievements.map((achievement) => {
                const IconComponent = iconMap[achievement.icon] || Star;
                return (
                  <AchievementBadge
                    key={achievement.id}
                    id={achievement.id}
                    title={achievement.title}
                    icon={IconComponent}
                    unlocked={achievement.unlocked}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Seu Plano de Hoje</h2>
          <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <DashboardCard
              title="Treinos"
              subtitle={`${completedToday}/${totalExercises} exercícios`}
              icon={Dumbbell}
              progress={exerciseProgress}
              variant="primary"
              onClick={() => onNavigate("treinos")}
            />
            <DashboardCard
              title="Alimentação"
              subtitle="Ver cardápio"
              icon={Salad}
              variant="accent"
              onClick={() => onNavigate("alimentacao")}
            />
            <DashboardCard
              title="Diástase"
              subtitle={progress.diastasisResult !== null ? "Teste feito" : "Fazer teste"}
              icon={Activity}
              variant="secondary"
              onClick={() => onNavigate("diastase")}
            />
            <DashboardCard
              title="Relaxamento"
              subtitle="Complementar"
              icon={Wind}
              variant="accent"
              onClick={() => onNavigate("extras")}
            />
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Conteúdos Extras</h2>
          <DashboardCard
            title="Aulas e Dicas"
            subtitle="Vídeos educativos, alongamentos e mais"
            icon={BookOpen}
            variant="accent"
            onClick={() => onNavigate("extras")}
          />
        </section>
      </div>
    </ScrollArea>
  );
}
