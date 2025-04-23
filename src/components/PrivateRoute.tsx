
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { hasValidAuthToken } from "@/services/authService";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Rota protegida: só renderiza o conteúdo se houver user autenticado via JWT.
 * Usa método direto de verificação de token para maior confiabilidade.
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { toast } = useToast();
  
  // Usar método direto para verificar autenticação
  const isAuthenticated = hasValidAuthToken();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    toast({
      title: "Acesso negado",
      description: "Você precisa estar logado para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo normalmente
  return <>{children}</>;
};

export default PrivateRoute;
