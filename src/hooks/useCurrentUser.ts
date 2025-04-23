
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
  const [user, setUser] = useState<JwtPayload | null>(() => {
    // Perform initial token check immediately on hook initialization
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return null;
      
      const payload = decodeJwt<JwtPayload>(token);
      if (!payload) return null;
      
      // Check token expiration
      if (payload.exp && Date.now() / 1000 > payload.exp) return null;
      
      return payload;
    } catch (error) {
      console.error("Error parsing auth token on init:", error);
      return null;
    }
  });

  useEffect(() => {
    // Function to extract user from token
    function checkToken() {
      try {
        const token = localStorage.getItem("auth_token");
        
        if (!token) {
          setUser(null);
          return;
        }
        
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
    // Also check periodically to catch token expiration
    const intervalId = setInterval(checkToken, 60000); // Check every minute
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(intervalId);
    };
  }, []);

  return user;
}
