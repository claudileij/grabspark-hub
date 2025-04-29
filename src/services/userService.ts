
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

export interface BucketFile {
  fileName: string;
  fileExtension: string;
  mimeType: string;
  fileSize: number; // In KB
  uploadDate?: string; // ISO string timestamp
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

/**
 * Get all files from the user's bucket
 */
export const getBucketFiles = async (): Promise<BucketFile[]> => {
  // Ensure we have a token
  const token = getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }
  
  // Simulation for development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo de desenvolvimento: simulando obtenção de arquivos do bucket');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            fileName: "documento",
            fileExtension: "pdf",
            mimeType: "application/pdf",
            fileSize: 245, // 245KB
            uploadDate: "2025-04-25T14:22:31.953Z"
          },
          {
            fileName: "imagem",
            fileExtension: "jpg",
            mimeType: "image/jpeg",
            fileSize: 1024, // 1MB
            uploadDate: "2025-04-26T10:15:22.953Z"
          },
          {
            fileName: "planilha",
            fileExtension: "xlsx",
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            fileSize: 512, // 512KB
            uploadDate: "2025-04-24T09:45:12.953Z"
          },
          {
            fileName: "apresentacao",
            fileExtension: "pptx",
            mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            fileSize: 780, // 780KB
            uploadDate: "2025-04-23T16:30:45.953Z"
          },
          {
            fileName: "texto",
            fileExtension: "txt",
            mimeType: "text/plain",
            fileSize: 5, // 5KB
            uploadDate: "2025-04-27T08:12:33.953Z"
          }
        ]);
      }, 1200);
    });
  }
  
  // Real implementation for production
  return await apiClient.get<BucketFile[]>('/files');
};

/**
 * Delete a file from the bucket
 */
export const deleteFile = async (fileName: string, fileExtension: string): Promise<void> => {
  // Ensure we have a token
  const token = getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }
  
  // Simulation for development environment
  if (process.env.NODE_ENV === 'development') {
    console.log(`Modo de desenvolvimento: simulando exclusão do arquivo ${fileName}.${fileExtension}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }
  
  // Real implementation for production
  await apiClient.delete<void>(`/files/${fileName}.${fileExtension}`);
};
