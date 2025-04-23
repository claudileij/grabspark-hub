
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Rota protegida: só renderiza o conteúdo se houver user autenticado via JWT.
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { toast } = useToast();
  
  // Check for token directly instead of using the hook
  const hasAuthToken = localStorage.getItem("auth_token") !== null;

  // Se não houver token de autenticação, redireciona para a página de login
  if (!hasAuthToken) {
    // Only show toast if there was an attempted access
    toast({
      title: "Acesso negado",
      description: "Você precisa estar logado para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderiza o conteúdo normalmente
  return <>{children}</>;
};

export default PrivateRoute;
