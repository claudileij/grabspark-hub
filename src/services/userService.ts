
import { apiClient } from "./apiClient";
import { getAuthToken } from "./authService";

export interface BucketInfo {
  hasBucket: boolean;
  bucketName: string;
  objectsAmount: number;
  bucketSize: number;
}

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  bucket: BucketInfo;
  storageLimit: number; // Storage limit in KB
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface BucketFile {
  _id: string;
  ownerId: string;
  fileName: string;
  fileKey: string;
  fileSize: number; // In bytes
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export type BucketFilesResponse = BucketFile[];

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
          _id: "6loNLyiJmj4bIaWTH9cwn",
          username: "claudilei",
          email: "claudileijunior01@gmail.com",
          bucket: {
            hasBucket: true,
            bucketName: "claudilei",
            objectsAmount: 0,
            bucketSize: 0.0
          },
          storageLimit: 102400, // 100MB in KB
          isVerified: true,
          createdAt: "2025-04-14T02:41:16.953Z",
          updatedAt: "2025-04-14T02:41:16.953Z",
        });
      }, 800);
    });
  }
  
  // Real implementation for production
  return await apiClient.get<UserInfo>('/users/me');
};


/**
 * Get all files from the user's bucket
 */
export const getBucketFiles = async (): Promise<BucketFilesResponse> => {
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
            _id: "file1",
            ownerId: "6loNLyiJmj4bIaWTH9cwn",
            fileName: "documento.pdf",
            fileKey: "user-id/nanoid/documento.pdf",
            fileSize: 251904, // 245KB in bytes
            mimeType: "application/pdf",
            createdAt: "2025-04-25T14:22:31.953Z",
            updatedAt: "2025-04-25T14:22:31.953Z"
          },
          {
            _id: "file2",
            ownerId: "6loNLyiJmj4bIaWTH9cwn",
            fileName: "imagem.jpg",
            fileKey: "user-id/nanoid/imagem.jpg",
            fileSize: 1048576, // 1MB in bytes
            mimeType: "image/jpeg",
            createdAt: "2025-04-26T10:15:22.953Z",
            updatedAt: "2025-04-26T10:15:22.953Z"
          },
          {
            _id: "file3",
            ownerId: "6loNLyiJmj4bIaWTH9cwn",
            fileName: "planilha.xlsx",
            fileKey: "user-id/nanoid/planilha.xlsx",
            fileSize: 524288, // 512KB in bytes
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            createdAt: "2025-04-24T09:45:12.953Z",
            updatedAt: "2025-04-24T09:45:12.953Z"
          },
          {
            _id: "file4",
            ownerId: "6loNLyiJmj4bIaWTH9cwn",
            fileName: "apresentacao.pptx",
            fileKey: "user-id/nanoid/apresentacao.pptx",
            fileSize: 798720, // 780KB in bytes
            mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            createdAt: "2025-04-23T16:30:45.953Z",
            updatedAt: "2025-04-23T16:30:45.953Z"
          },
          {
            _id: "file5",
            ownerId: "6loNLyiJmj4bIaWTH9cwn",
            fileName: "texto.txt",
            fileKey: "user-id/nanoid/texto.txt",
            fileSize: 5120, // 5KB in bytes
            mimeType: "text/plain",
            createdAt: "2025-04-27T08:12:33.953Z",
            updatedAt: "2025-04-27T08:12:33.953Z"
          }
        ]);
      }, 1200);
    });
  }
  
  // Real implementation for production
  return await apiClient.get<BucketFilesResponse>('/files');
};

/**
 * Delete a file from the bucket
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  // Ensure we have a token
  const token = getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }
  
  // Simulation for development environment
  if (process.env.NODE_ENV === 'development') {
    console.log(`Modo de desenvolvimento: simulando exclusão do arquivo ${fileId}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }
  
  // Real implementation for production
  await apiClient.delete<void>(`/files/${fileId}`);
};
