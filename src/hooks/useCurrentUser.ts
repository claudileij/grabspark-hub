
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
    // Check token immediately when component mounts
    checkToken();

    // Function to extract user from token
    function checkToken() {
      const token = localStorage.getItem("auth_token");
      
      if (!token) {
        setUser(null);
        return;
      }
      
      try {
        const payload = decodeJwt<JwtPayload>(token);
        if (!payload) {
          localStorage.removeItem("auth_token");
          setUser(null);
          return;
        }
        
        // Check expiration
        if (payload.exp && Date.now() / 1000 > payload.exp) {
          localStorage.removeItem("auth_token");
          setUser(null);
          return;
        }
        
        setUser(payload);
      } catch (error) {
        console.error("Error parsing auth token:", error);
        localStorage.removeItem("auth_token");
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
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return user;
}
