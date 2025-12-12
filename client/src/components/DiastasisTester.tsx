import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info, CheckCircle2 } from "lucide-react";

interface Step {
  title: string;
  description: string;
  tip?: string;
}

const steps: Step[] = [
  {
    title: "Posição Inicial",
    description: "Deite-se de costas com os joelhos dobrados e os pés apoiados no chão, na largura dos quadris.",
    tip: "Use um colchonete ou superfície macia para maior conforto.",
  },
  {
    title: "Localize o Umbigo",
    description: "Coloque os dedos indicador e médio horizontalmente sobre o umbigo, com as pontas dos dedos apontando para baixo.",
  },
  {
    title: "Eleve a Cabeça",
    description: "Levante lentamente a cabeça e os ombros do chão, como se fosse fazer um abdominal. Mantenha a posição.",
    tip: "Não force o pescoço. O movimento deve ser suave.",
  },
  {
    title: "Sinta a Separação",
    description: "Com os dedos sobre o umbigo, sinta se há um espaço entre os músculos abdominais. Conte quantos dedos cabem nesse espaço.",
  },
  {
    title: "Registre o Resultado",
    description: "Anote quantos dedos de separação você sentiu. Repita o teste 3cm acima e 3cm abaixo do umbigo.",
  },
];

const results = [
  { fingers: "0-1", level: "Normal", color: "bg-green-500", description: "Parabéns! Sua musculatura abdominal está em boas condições." },
  { fingers: "2", level: "Leve", color: "bg-amber-500", description: "Diástase leve. Os exercícios do programa ajudarão na recuperação." },
  { fingers: "3", level: "Moderada", color: "bg-orange-500", description: "Diástase moderada. Foque nos exercícios hipopressivos e de ativação do core." },
  { fingers: "4+", level: "Severa", color: "bg-red-500", description: "Diástase severa. Recomendamos consultar um fisioterapeuta especializado." },
];

interface DiastasisTesterProps {
  onComplete?: (result: number) => void;
}

export default function DiastasisTester({ onComplete }: DiastasisTesterProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState<number | null>(null);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectResult = (index: number) => {
    setSelectedResult(index);
    onComplete?.(index);
  };

  return (
    <div className="space-y-4 sm:space-y-6" data-testid="diastasis-tester">
      <div className="flex justify-center gap-1.5 sm:gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              index === currentStep && !showResults
                ? "bg-primary"
                : index < currentStep || showResults
                ? "bg-primary/40"
                : "bg-muted"
            }`}
          />
        ))}
        <div
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
            showResults ? "bg-primary" : "bg-muted"
          }`}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                  {currentStep + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {steps[currentStep].title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                {steps[currentStep].description}
              </p>

              {steps[currentStep].tip && (
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg bg-accent/50 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {steps[currentStep].tip}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground text-center mb-4 sm:mb-6">
                Qual foi seu resultado?
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectResult(index)}
                    className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border text-left transition-all ${
                      selectedResult === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid={`result-${index}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${result.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-medium text-foreground text-sm sm:text-base">
                            {result.fingers} dedos
                          </span>
                          <span className="text-[11px] sm:text-sm text-muted-foreground flex-shrink-0">
                            {result.level}
                          </span>
                        </div>
                      </div>
                      {selectedResult === index && (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                    {selectedResult === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground"
                      >
                        {result.description}
                      </motion.p>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between gap-3 sm:gap-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 && !showResults}
          data-testid="btn-prev"
          className="text-xs sm:text-sm"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
          Anterior
        </Button>
        {!showResults && (
          <Button onClick={nextStep} data-testid="btn-next" className="text-xs sm:text-sm">
            {currentStep === steps.length - 1 ? "Ver Resultados" : "Próximo"}
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
