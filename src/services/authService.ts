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
  encPassword: string;
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
 * Criptografa a senha usando AES-CBC
 */
export const encryptPassword = async (password: string): Promise<string> => {
  const keyHex = '2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c';
  const ivHex = '000102030405060708090a0b0c0d0e0f';

  const key = await crypto.subtle.importKey(
    'raw',
    hexToBytes(keyHex),
    { name: 'AES-CBC' },
    false,
    ['encrypt']
  );

  const iv = hexToBytes(ivHex);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    new TextEncoder().encode(password)
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

// Utilitários
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

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
          message: "Verification code sent"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RegisterResponse>('/register/code', data);
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
          message: "Registration confirmed"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RegisterResponse>('/register/confirm', data);
};

/**
 * Realiza o login do usuário
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  // Criptografar a senha antes de enviar
  const encPassword = await encryptPassword(password);
  
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando login');
    console.log('Login tentativa', { email, encPassword });
    
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
  const response = await apiClient.post<AuthResponse>('/login', { email, encPassword });
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
    const response = await apiClient.get<{ user: UserData }>('/user/me');
    return response.user;
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
          message: "Código de recuperação enviado para seu email"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RecoveryResponse>('/login/recovery', { email });
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
  
  // Implementação real para produção
  return await apiClient.post<RecoveryResponse>('/login/recovery/code', { email, code });
};

/**
 * Confirma a recuperação de senha
 * Define uma nova senha para o usuário
 */
export const confirmPasswordRecovery = async (email: string, code: string, newPassword: string): Promise<RecoveryResponse> => {
  // Criptografar a nova senha antes de enviar
  const encryptedPassword = await encryptPassword(newPassword);
  
  // Simulação para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando confirmação de recuperação de senha');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Senha atualizada com sucesso"
        });
      }, 1000);
    });
  }
  
  // Implementação real para produção
  return await apiClient.post<RecoveryResponse>('/login/recovery/confirm', { 
    email, 
    code,
    newPassword: encryptedPassword 
  });
};

// Inicializa o serviço de autenticação
initAuthService();
