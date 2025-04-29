
import { apiClient } from "./apiClient";
import { getAuthToken } from "./authService";

export interface BucketInfo {
  hasBucket: boolean;
  bucketName: string;
  objectsAmount: number;
  bucketSize: number;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  bucket: BucketInfo;
  createdAt: string;
}

export interface FilesData {
  objectsAmount: number;
  bucketSize: number;
}

/**
 * Get the current user's information including bucket details
 */
export const getUserInfo = async (): Promise<UserInfo> => {
  // Ensure we have a token
  const token = getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }
  
  // Simulation for development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando obtenção de dados do usuário');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "6loNLyiJmj4bIaWTH9cwn",
          username: "claudilei",
          email: "claudileijunior01@gmail.com",
          bucket: {
            hasBucket: true,
            bucketName: "claudilei",
            objectsAmount: 0,
            bucketSize: 0.0
          },
          createdAt: "2025-04-14T02:41:16.953Z",
        });
      }, 800);
    });
  }
  
  // Real implementation for production
  return await apiClient.get<UserInfo>('/users/me');
};

/**
 * Get files data including count and total size
 */
export const getFilesData = async (): Promise<FilesData> => {
  // Ensure we have a token
  const token = getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }
  
  // Simulation for development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando obtenção de dados de arquivos');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          objectsAmount: 5,
          bucketSize: 1536000 // 1.5MB for testing
        });
      }, 800);
    });
  }
  
  // Real implementation for production
  return await apiClient.get<FilesData>('/files/files-data');
};

