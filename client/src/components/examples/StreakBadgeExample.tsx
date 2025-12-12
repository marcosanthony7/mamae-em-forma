import StreakBadge from "../StreakBadge";

export default function StreakBadgeExample() {
  return (
    <div className="p-6 bg-background flex items-center gap-4">
      <StreakBadge streak={7} />
      <StreakBadge streak={15} animate={false} />
    </div>
  );
}
