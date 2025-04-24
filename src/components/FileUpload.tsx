
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { getUploadUrl, uploadFileToUrl } from "@/services/uploadService";

export const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Primeiro, obtém a URL de upload
      const uploadUrl = await getUploadUrl({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // Em seguida, faz o upload do arquivo
      await uploadFileToUrl(uploadUrl, file);

      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao enviar arquivo. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer"
      >
        <Button disabled={isUploading}>
          <Upload className="mr-2" />
          {isUploading ? 'Enviando...' : 'Upload de Arquivo'}
        </Button>
      </label>
    </div>
  );
};
