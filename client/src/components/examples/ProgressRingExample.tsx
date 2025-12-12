import ProgressRing from "../ProgressRing";

export default function ProgressRingExample() {
  return (
    <div className="flex items-center justify-center p-8 bg-background">
      <ProgressRing progress={40} size={180}>
        <div className="text-center">
          <span className="text-3xl font-bold text-foreground">Dia 12</span>
          <p className="text-sm text-muted-foreground">de 30</p>
        </div>
      </ProgressRing>
    </div>
  );
}
