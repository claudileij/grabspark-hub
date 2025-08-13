import { apiClient } from "./apiClient";

interface FileUploadRequest {
  fileName: string;
  fileSize: number;
  mimeType: string;
}

interface UploadUrlResponse {
  presignedPost: {
    url: string;
    fields: Record<string, string>;
  };
  fileKey: string;
}

interface UploadCompleteRequest {
  fileKey: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

interface UploadCompleteResponse {
  success: boolean;
  message: string;
  file: {
    _id: string;
    ownerId: string;
    fileName: string;
    fileKey: string;
    fileSize: number;
    mimeType: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Função para obter a URL e os campos do formulário de upload S3 do backend
export const getUploadUrl = async (fileData: FileUploadRequest): Promise<UploadUrlResponse> => {
  try {
    const response = await apiClient.post<UploadUrlResponse>('/files/upload-url', fileData);
    return response;  // Retorna a URL e os campos do formulário S3
  } catch (error) {
    console.error('Erro ao obter URL de upload:', error);
    throw error;
  }
};

// Função para realizar o upload do arquivo para o S3
export const uploadFileToUrl = async (
  url: string, 
  fields: Record<string, string>,  // Campos do formulário S3
  file: File, 
  onProgress?: (progress: number) => void
): Promise<void> => {
  try {
    // Criar um objeto FormData para enviar o arquivo
    const formData = new FormData();
    
    // Adicionar os campos do formulário S3
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Adicionar o arquivo binário
    formData.append('file', file); // 'file' é o nome do campo para o arquivo no formulário S3

    // Criar um XMLHttpRequest para enviar o FormData e monitorar o progresso
    const xhr = new XMLHttpRequest();
    
    const uploadPromise = new Promise<void>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);  // Chama o callback de progresso
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();  // Upload concluído com sucesso
        } else {
          reject(new Error(`Erro HTTP: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Erro de rede'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload abortado'));
      });
    });

    // Enviar o formulário via POST
    xhr.open('POST', url);
    xhr.send(formData);  // Envia o FormData com o arquivo binário e os campos

    return uploadPromise;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
};

// Função para confirmar o upload no backend
export const confirmUpload = async (data: UploadCompleteRequest): Promise<UploadCompleteResponse> => {
  try {
    const response = await apiClient.post<UploadCompleteResponse>('/files/upload-complete', data);
    return response;
  } catch (error) {
    console.error('Erro ao confirmar upload:', error);
    throw error;
  }
};

// Função para obter URL de download de um arquivo
export const getDownloadUrl = async (fileId: string): Promise<{ url: string }> => {
  try {
    const response = await apiClient.get<{ url: string }>(`/files/${fileId}/download-url`);
    return response;
  } catch (error) {
    console.error('Erro ao obter URL de download:', error);
    throw error;
  }
};