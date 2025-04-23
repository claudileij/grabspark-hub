
import { useState, useEffect } from "react";
import { decodeJwt } from "@/utils/jwt";
import { hasValidAuthToken } from "@/services/authService";

type JwtPayload = {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
};

export function useCurrentUser() {
  const [user, setUser] = useState<JwtPayload | null>(() => {
    // Verificação inicial usando o novo método mais direto
    if (!hasValidAuthToken()) return null;
    
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return null;
      
      const payload = decodeJwt<JwtPayload>(token);
      return payload;
    } catch (error) {
      console.error("Error parsing auth token on init:", error);
      return null;
    }
  });

  useEffect(() => {
    // Function to extract user from token
    function checkToken() {
      if (!hasValidAuthToken()) {
        setUser(null);
        return;
      }
      
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setUser(null);
          return;
        }
        
        const payload = decodeJwt<JwtPayload>(token);
        setUser(payload);
      } catch (error) {
        console.error("Error parsing auth token:", error);
        setUser(null);
      }
    }

    // Update when storage changes (e.g., another tab logs out)
    function handleStorage(e: StorageEvent) {
      if (e.key === "auth_token" || e.key === null) {
        checkToken();
      }
    }
    
    window.addEventListener("storage", handleStorage);
    // Check periodically
    const intervalId = setInterval(checkToken, 30000); // Check every 30 seconds
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(intervalId);
    };
  }, []);

  return user;
}
