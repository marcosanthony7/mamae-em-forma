import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Utensils, Trophy, ArrowRight, Loader2 } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro ao entrar",
        description: "Não foi possível fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-primary/10 to-background flex flex-col">
      <header className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Mamãe em Forma</h1>
        </div>
        <p className="text-muted-foreground">Recuperação pós-parto em 30 dias</p>
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Sua jornada de recuperação começa aqui
          </h2>
          <p className="text-muted-foreground">
            Programa completo com exercícios, alimentação e acompanhamento personalizado para mamães
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Exercícios Guiados</h3>
                <p className="text-sm text-muted-foreground">
                  Treinos adaptados para parto normal e cesárea
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Plano Alimentar</h3>
                <p className="text-sm text-muted-foreground">
                  Receitas nutritivas e lista de compras semanal
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Conquistas</h3>
                <p className="text-sm text-muted-foreground">
                  Desbloqueie medalhas ao completar o programa
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-auto space-y-4">
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLogin}
            disabled={isLoggingIn}
            data-testid="button-login"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <SiGoogle className="w-4 h-4 mr-2" />
            )}
            Entrar com Google
            {!isLoggingIn && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Ao entrar, você concorda com nossos termos de uso
          </p>
        </div>
      </main>
    </div>
  );
}
