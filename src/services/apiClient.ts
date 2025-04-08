
import { toast } from "sonner";

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// URL base da API - pode ser substituída em uma variável de ambiente
const API_BASE_URL = "http://localhost:3000"; 

interface FetchOptions extends RequestInit {
  skipErrorToast?: boolean;
}

// Define a interface para o apiClient para permitir tipos genéricos
interface ApiClient {
  get<T>(endpoint: string, options?: FetchOptions): Promise<T>;
  post<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T>;
  put<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T>;
  patch<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T>;
  delete<T>(endpoint: string, options?: FetchOptions): Promise<T>;
  request<T>(endpoint: string, options?: FetchOptions): Promise<T>;
}

/**
 * Implementação do cliente HTTP base para fazer requisições à API
 */
const apiClientImpl: ApiClient = {
  /**
   * Realiza uma requisição GET
   */
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const config: FetchOptions = {
      ...options,
      method: "GET",
    };
    return this.request<T>(endpoint, config);
  },

  /**
   * Realiza uma requisição POST
   */
  async post<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    const config: FetchOptions = {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    };
    return this.request<T>(endpoint, config);
  },

  /**
   * Realiza uma requisição PUT
   */
  async put<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    const config: FetchOptions = {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    };
    return this.request<T>(endpoint, config);
  },

  /**
   * Realiza uma requisição PATCH
   */
  async patch<T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    const config: FetchOptions = {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    };
    return this.request<T>(endpoint, config);
  },

  /**
   * Realiza uma requisição DELETE
   */
  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const config: FetchOptions = {
      ...options,
      method: "DELETE",
    };
    return this.request<T>(endpoint, config);
  },

  /**
   * Método base para realizar requisições HTTP
   */
  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      // Dados da resposta
      const data = await response.json().catch(() => ({}));
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        const error: ApiError = {
          message: data.message || "Ocorreu um erro inesperado",
          status: response.status,
          errors: data.errors,
        };
        
        // Se não estiver configurado para pular o toast de erro
        if (!options.skipErrorToast) {
          toast.error(error.message);
        }
        
        throw error;
      }
      
      return data as T;
    } catch (error) {
      // Erros não tratados acima (como erro de rede)
      if (!(error as ApiError).status && !options.skipErrorToast) {
        toast.error("Não foi possível conectar ao servidor");
      }
      throw error;
    }
  },
};

// Export the implemented client
export const apiClient = apiClientImpl;

// Para uso em testes ou desenvolvimento
export const setupMockApi = (mockImplementation: Partial<typeof apiClient>) => {
  Object.assign(apiClient, mockImplementation);
};
