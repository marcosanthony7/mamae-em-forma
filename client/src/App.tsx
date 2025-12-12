import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import Dashboard from "@/pages/Dashboard";
import Treinos from "@/pages/Treinos";
import Alimentacao from "@/pages/Alimentacao";
import Diastase from "@/pages/Diastase";
import Extras from "@/pages/Extras";
import Landing from "@/pages/Landing";
import { Loader2 } from "lucide-react";

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "treinos":
        return <Treinos onBack={() => setActiveTab("dashboard")} />;
      case "alimentacao":
        return <Alimentacao onBack={() => setActiveTab("dashboard")} />;
      case "diastase":
        return <Diastase onBack={() => setActiveTab("dashboard")} onNavigate={setActiveTab} />;
      case "extras":
        return <Extras onBack={() => setActiveTab("dashboard")} />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-dvh bg-background overflow-x-hidden w-full max-w-full">
      <main className="h-dvh overflow-hidden">
        {renderPage()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  return <AuthenticatedApp />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
