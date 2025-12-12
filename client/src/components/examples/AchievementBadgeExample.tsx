import AchievementBadge from "../AchievementBadge";
import { Trophy, Star, Target, Flame, Medal, Crown } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function AchievementBadgeExample() {
  return (
    <div className="p-6 bg-background">
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          <AchievementBadge
            id="1"
            title="Primeiro Dia"
            icon={Star}
            unlocked
            onClick={(id) => console.log("Badge clicked:", id)}
          />
          <AchievementBadge
            id="2"
            title="7 Dias"
            icon={Flame}
            unlocked
            onClick={(id) => console.log("Badge clicked:", id)}
          />
          <AchievementBadge
            id="3"
            title="15 Dias"
            icon={Target}
            unlocked={false}
            onClick={(id) => console.log("Badge clicked:", id)}
          />
          <AchievementBadge
            id="4"
            title="30 Dias"
            icon={Trophy}
            unlocked={false}
            onClick={(id) => console.log("Badge clicked:", id)}
          />
          <AchievementBadge
            id="5"
            title="Guerreira"
            icon={Crown}
            unlocked={false}
            onClick={(id) => console.log("Badge clicked:", id)}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
