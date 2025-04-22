
import { useState, useEffect } from "react";
import { decodeJwt } from "@/utils/jwt";

type JwtPayload = {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
};

export function useCurrentUser() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    function extractFromToken() {
      const token = localStorage.getItem("auth_token");
      if (!token) return null;
      const payload = decodeJwt<JwtPayload>(token);
      if (!payload) return null;
      // Checa expiração
      if (payload.exp && Date.now() / 1000 > payload.exp) {
        localStorage.removeItem("auth_token");
        return null;
      }
      return payload;
    }
    setUser(extractFromToken());

    // Atualiza ao mudar storage (ex: outro tab faz logout)
    function handleStorage(e: StorageEvent) {
      if (e.key === "auth_token") {
        setUser(extractFromToken());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return user;
}
