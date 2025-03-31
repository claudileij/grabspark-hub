
// Base client para realizar chamadas de API
import { toast } from "sonner";

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// URL base da API - pode ser substituída em uma variável de ambiente
const API_BASE_URL = "/api"; 

interface FetchOptions extends RequestInit {
  skipErrorToast?: boolean;
}

/**
 * Cliente HTTP base para fazer requisições à API
 */
export const apiClient = {
  /**
   * Realiza uma requisição GET
   */
  async get<T = any>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  },

  /**
   * Realiza uma requisição POST
   */
  async post<T = any>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Realiza uma requisição PUT
   */
  async put<T = any>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Realiza uma requisição PATCH
   */
  async patch<T = any>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Realiza uma requisição DELETE
   */
  async delete<T = any>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  },

  /**
   * Método base para realizar requisições HTTP
   */
  async request<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
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

// Para uso em testes ou desenvolvimento
export const setupMockApi = (mockImplementation: Partial<typeof apiClient>) => {
  Object.assign(apiClient, mockImplementation);
};
