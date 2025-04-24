
import { apiClient } from "./apiClient";

interface FileUploadRequest {
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UploadUrlResponse {
  url: string;
}

export const getUploadUrl = async (fileData: FileUploadRequest): Promise<string> => {
  try {
    const response = await apiClient.post<UploadUrlResponse>('/files/upload', fileData);
    return response.url;
  } catch (error) {
    console.error('Erro ao obter URL de upload:', error);
    throw error;
  }
};

export const uploadFileToUrl = async (url: string, file: File): Promise<void> => {
  try {
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
};
