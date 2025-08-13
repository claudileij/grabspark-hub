import { apiClient } from "./apiClient";

// Interfaces para os dados
interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface ConfirmRegisterData {
  email: string;
  code: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  access_token: string;
  user: UserData;
}

interface UserData {
  id: string;
  email: string;
  username: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface RecoveryResponse {
  success: boolean;
  message: string;
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

// Exportando a função getAuthToken para ser usada em outros serviços
export const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem("auth_token");
  }
  return authToken;
};

/**
 * Verifica se há um token válido diretamente
 * Método mais direto e confiável para verificar autenticação
 */
export const hasValidAuthToken = (): boolean => {
  try {
    const token = localStorage.getItem("auth_token");
    // Se não houver token, não está autenticado
    if (!token) return false;
    
    // Se o token existir, considera autenticado
    // Para melhor segurança, poderíamos verificar expiração
    return true;
  } catch (error) {
    console.error("Erro ao verificar token de autenticação:", error);
    return false;
  }
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
    apiClient.request = async function(endpoint: string, options: any = {}) {
      const token = getAuthToken();
      
      if (token) {
        const headers = options.headers || {};
        options = {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
      
      return originalRequest.call(this, endpoint, options);
    };
  }
};


/**
 * Registra um novo usuário
 */
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando requisição de registro');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Verification code sent successfully!"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RegisterResponse>('/users/register/send-code', data);
};

/**
 * Confirma o registro com o código de verificação
 */
export const confirmRegister = async (data: ConfirmRegisterData): Promise<RegisterResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando confirmação de registro');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "User verified successfully. Please log in."
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RegisterResponse>('/users/register/confirm', data);
};

/**
 * Realiza o login do usuário
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando login');
    console.log('Login tentativa', { email, password });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula resposta de login bem-sucedido
        const mockResponse: AuthResponse = {
          success: true,
          access_token: "mock-jwt-token",
          user: {
            id: "user-123",
            email: email,
            username: "Usuario Teste",
          },
        };
        
        setAuthToken(mockResponse.access_token);
        
        resolve(mockResponse);
      }, 800);
    });
  }
  
  // Implementação real para produção
  const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
  setAuthToken(response.access_token);
  return response;
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
    const response = await apiClient.get<UserData>('/users/me');
    return response;
  } catch (error) {
    // Se ocorrer um erro 401, remove o token
    if ((error as any).status === 401) {
      setAuthToken(null);
    }
    return null;
  }
};

/**
 * Solicita recuperação de senha
 * Envia um código de recuperação para o email do usuário
 */
export const requestPasswordRecovery = async (email: string): Promise<RecoveryResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando requisição de recuperação de senha');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "If a user with that email exists, a recovery code has been sent."
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RecoveryResponse>('/users/recovery/send-code', { email });
};

/**
 * Verifica o código de recuperação
 */
export const verifyRecoveryCode = async (email: string, code: string): Promise<RecoveryResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando verificação de código de recuperação');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Código verificado com sucesso"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção - A nova API combina verificação e alteração em um endpoint
  return { success: true, message: "Use confirmPasswordRecovery directly" };
};

/**
 * Confirma a recuperação de senha
 * Define uma nova senha para o usuário
 */
export const confirmPasswordRecovery = async (email: string, code: string, newPassword: string): Promise<RecoveryResponse> => {
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando confirmação de recuperação de senha');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Password has been reset successfully."
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RecoveryResponse>('/users/recovery/confirm', { 
    email, 
    code,
    newPassword 
  });
};

// Inicializa o serviço de autenticação
initAuthService();
