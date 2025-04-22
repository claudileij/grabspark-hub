
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Rota protegida: só renderiza o conteúdo se houver user autenticado via JWT.
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useCurrentUser();

  if (!user) {
    // Redireciona para login se não autenticado
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
