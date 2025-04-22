
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/components/ui/use-toast";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Rota protegida: só renderiza o conteúdo se houver user autenticado via JWT.
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useCurrentUser();
  const { toast } = useToast();

  // Se não houver usuário autenticado, redireciona para a página de login
  if (!user) {
    // Only show toast if there was an attempted access
    toast({
      title: "Acesso negado",
      description: "Você precisa estar logado para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }

  // Se houver usuário, renderiza o conteúdo normalmente
  return <>{children}</>;
};

export default PrivateRoute;
