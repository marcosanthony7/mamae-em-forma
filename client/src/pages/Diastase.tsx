import { motion } from "framer-motion";
import { ChevronLeft, Info, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import DiastasisTester from "@/components/DiastasisTester";
import { useProgress, useSetDiastasisResult } from "@/hooks/useProgress";

interface DiastaseProps {
  onBack?: () => void;
  onNavigate?: (tab: string) => void;
}

export default function Diastase({ onBack, onNavigate }: DiastaseProps) {
  const { data: progress, isLoading } = useProgress();
  const setDiastasisResult = useSetDiastasisResult();

  if (isLoading || !progress) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const testCompleted = progress.diastasisResult !== null;
  const testResult = progress.diastasisResult;

  const handleTestComplete = (result: number) => {
    setDiastasisResult.mutate(result);
  };

  const resetTest = () => {
    setDiastasisResult.mutate(null);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {onBack && (
            <Button size="icon" variant="ghost" onClick={onBack} data-testid="btn-back" className="flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">Teste de Diástase</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Avalie sua recuperação</p>
          </div>
          {testCompleted && (
            <Button variant="ghost" size="sm" onClick={resetTest} data-testid="btn-reset" className="flex-shrink-0 text-xs sm:text-sm">
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Refazer
            </Button>
          )}
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-accent/30 border border-accent-border"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground mb-1">O que é Diástase?</h3>
                <p className="text-sm text-muted-foreground">
                  A diástase abdominal é a separação dos músculos retos abdominais, 
                  comum após a gestação. Este teste ajuda a identificar o grau de 
                  separação para personalizar sua recuperação.
                </p>
              </div>
            </div>
          </motion.div>

          {testCompleted && testResult !== null ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="p-6 text-center">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Resultado Salvo
                </h2>
                <p className="text-muted-foreground mb-6">
                  Com base no seu resultado, preparamos exercícios específicos 
                  para ajudar na sua recuperação. Acesse a área de treinos para 
                  ver as recomendações personalizadas.
                </p>
                <Button onClick={() => onNavigate?.("treinos")} data-testid="btn-exercises">
                  Ver Exercícios Recomendados
                </Button>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Recomendações Gerais</h3>
                <div className="space-y-3">
                  {[
                    "Evite exercícios abdominais tradicionais (crunches)",
                    "Foque em exercícios hipopressivos e de ativação do transverso",
                    "Mantenha postura correta durante atividades diárias",
                    "Evite carregar pesos excessivos",
                    "Consulte um fisioterapeuta para acompanhamento",
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <DiastasisTester onComplete={handleTestComplete} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
