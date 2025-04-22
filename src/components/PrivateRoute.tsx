
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar esta página.",
        variant: "destructive"
      });
      navigate("/login", { replace: true });
    }
  }, [user, navigate, toast]);

  // Se não houver usuário autenticado, não renderiza nada enquanto redireciona
  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
