
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

export const uploadFileToUrl = async (
  url: string, 
  file: File, 
  onProgress?: (progress: number) => void
): Promise<void> => {
  try {
    // Create a new XMLHttpRequest to track upload progress
    const xhr = new XMLHttpRequest();
    
    // Setup the promise to track completion
    const uploadPromise = new Promise<void>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        reject(new Error('Network Error'));
      });
      
      xhr.addEventListener('abort', () => {
        reject(new Error('Upload Aborted'));
      });
    });
    
    // Open and send the request
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
    
    return uploadPromise;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
};
