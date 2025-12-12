import VideoCard from "../VideoCard";

export default function VideoCardExample() {
  return (
    <div className="p-6 bg-background grid grid-cols-2 gap-4 max-w-md">
      <VideoCard
        id="1"
        title="Introdução ao LPF - Exercícios Hipopressivos"
        duration="12 min"
        category="Hipopressivos"
        onClick={(id) => console.log("Play video:", id)}
      />
      <VideoCard
        id="2"
        title="Postura Correta para Amamentação"
        duration="8 min"
        category="Postura"
        watched
        onClick={(id) => console.log("Play video:", id)}
      />
      <VideoCard
        id="3"
        title="Alongamento para Alívio de Dores"
        duration="15 min"
        category="Relaxamento"
        progress={45}
        onClick={(id) => console.log("Play video:", id)}
      />
    </div>
  );
}
