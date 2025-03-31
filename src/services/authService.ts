
import { apiClient } from "./apiClient";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserData;
  token: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Token de autenticação
let authToken: string | null = null;

// Funções para gerenciar o token de autenticação
const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }
};

const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem("auth_token");
  }
  return authToken;
};

/**
 * Inicializa o serviço de autenticação
 */
export const initAuthService = () => {
  // Carrega o token do localStorage, se existir
  const token = localStorage.getItem("auth_token");
  if (token) {
    setAuthToken(token);
    
    // Interceptar requisições para adicionar o token
    const originalRequest = apiClient.request;
    apiClient.request = async function<T>(endpoint: string, options = {}) {
      const token = getAuthToken();
      
      if (token) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
      
      return originalRequest.call(this, endpoint, options) as Promise<T>;
    };
  }
};

/**
 * Realiza o login do usuário
 */
export const loginUser = async (credentials: LoginCredentials): Promise<UserData> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando login');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula um usuário de teste
        const mockUser = {
          id: "user-123",
          name: "Usuário Teste",
          email: credentials.email,
          createdAt: new Date().toISOString(),
        };
        const mockToken = "mock-jwt-token";
        
        setAuthToken(mockToken);
        
        resolve(mockUser);
      }, 800); // Simula um delay de rede
    });
  }
  
  // Implementação real para produção
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  setAuthToken(response.token);
  return response.user;
};

/**
 * Registra um novo usuário
 */
export const registerUser = async (data: RegisterData): Promise<UserData> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando registro');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula um usuário registrado
        const mockUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          createdAt: new Date().toISOString(),
        };
        
        resolve(mockUser);
      }, 1000); // Simula um delay de rede
    });
  }
  
  // Implementação real para produção
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  // Não faz login automático após registro, apenas retorna os dados
  return response.user;
};

/**
 * Desloga o usuário atual
 */
export const logoutUser = (): void => {
  setAuthToken(null);
  // Poderia fazer uma chamada para invalidar o token no servidor
  // apiClient.post('/auth/logout');
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Obtem dados do usuário atual
 */
export const getCurrentUser = async (): Promise<UserData | null> => {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    return await apiClient.get<UserData>('/auth/me');
  } catch (error) {
    // Se ocorrer um erro 401, remove o token
    if ((error as any).status === 401) {
      setAuthToken(null);
    }
    return null;
  }
};

// Inicializa o serviço de autenticação
initAuthService();
