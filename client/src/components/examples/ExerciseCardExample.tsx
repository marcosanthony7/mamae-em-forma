import ExerciseCard from "../ExerciseCard";

export default function ExerciseCardExample() {
  return (
    <div className="p-6 bg-background space-y-4 max-w-md">
      <ExerciseCard
        id="1"
        title="Respiração Diafragmática"
        duration="5 min"
        difficulty="fácil"
        instructions="Deite-se de costas com os joelhos dobrados. Coloque uma mão no peito e outra no abdômen. Inspire profundamente pelo nariz, expandindo o abdômen. Expire lentamente pela boca."
        adaptations={{
          normal: "Pode iniciar logo após o parto, respeitando seu conforto.",
          cesarea: "Aguarde liberação médica. Comece com movimentos suaves.",
        }}
        onComplete={(id) => console.log("Completed:", id)}
        onPlay={(id) => console.log("Play:", id)}
      />
      <ExerciseCard
        id="2"
        title="Ativação do Transverso"
        duration="8 min"
        difficulty="moderado"
        instructions="Em posição de quatro apoios, inspire e ao expirar, contraia o abdômen como se estivesse puxando o umbigo para a coluna."
        completed
        onComplete={(id) => console.log("Completed:", id)}
        onPlay={(id) => console.log("Play:", id)}
      />
    </div>
  );
}
