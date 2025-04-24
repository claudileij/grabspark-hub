import { apiClient } from "./apiClient";

interface FileUploadRequest {
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UploadUrlResponse {
  url: string;
  fields: Record<string, string>;  // Campos do formulário S3, como AWSAccessKeyId, signature, etc.
}

// Função para obter a URL e os campos do formulário de upload S3 do backend
export const getUploadUrl = async (fileData: FileUploadRequest): Promise<UploadUrlResponse> => {
  try {
    const response = await apiClient.post<UploadUrlResponse>('/files/upload', fileData);
    return response.data;  // Retorna a URL e os campos do formulário S3
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

    // Adicionar o arquivo
    formData.append('file', file);

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
    xhr.send(formData);  // Envia o FormData com o arquivo e os campos

    return uploadPromise;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
};
