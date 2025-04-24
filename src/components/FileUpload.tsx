
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getUploadUrl, uploadFileToUrl } from "@/services/uploadService";
import { Progress } from "@/components/ui/progress";

const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setUploadStatus('idle');
    setUploadProgress(0);
    
    try {
      const uploadUrl = await getUploadUrl({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // Use the progress callback from our enhanced uploadFileToUrl function
      await uploadFileToUrl(
        uploadUrl, 
        file, 
        (progress) => {
          setUploadProgress(progress);
          console.log(`Upload progress: ${progress}%`);
        }
      );
      
      // Ensure we set 100% when complete
      setUploadProgress(100);
      setUploadStatus('success');
      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      setUploadStatus('error');
      setUploadProgress(0);
      toast.error('Erro ao enviar arquivo. Tente novamente.');
    } finally {
      setIsUploading(false);
      // Reset file input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg p-6 shadow-md">
        <div className="text-center mb-6">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileUp className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Upload de Arquivo</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Selecione um arquivo para enviar
          </p>
        </div>

        {fileName && (
          <>
            <div className={`mb-4 p-3 rounded-md flex items-center gap-2 ${
              uploadStatus === 'success' ? 'bg-green-500/10 text-green-500' : 
              uploadStatus === 'error' ? 'bg-red-500/10 text-red-500' : 
              'bg-secondary'
            }`}>
              {uploadStatus === 'success' ? <Check className="h-4 w-4" /> : 
               uploadStatus === 'error' ? <AlertCircle className="h-4 w-4" /> : 
               <FileUp className="h-4 w-4" />}
              <span className="text-sm truncate">{fileName}</span>
            </div>
            
            {(isUploading || uploadStatus === 'success') && (
              <div className="mb-4">
                <Progress 
                  value={uploadProgress} 
                  className={`h-2 ${
                    uploadStatus === 'success' ? 'bg-green-100' : ''
                  }`} 
                />
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  {uploadProgress}%
                </p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
            ref={fileInputRef}
          />
          <Button 
            className="w-full transition-all" 
            disabled={isUploading}
            variant={uploadStatus === 'success' ? "default" : "default"}
            size="lg"
            onClick={handleButtonClick}
            type="button"
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                Enviando ({uploadProgress}%)
              </>
            ) : (
              <>
                <Upload className="mr-2" />
                {uploadStatus === 'success' ? 'Enviar outro arquivo' : 'Selecionar arquivo'}
              </>
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Formatos suportados: PDF, JPG, PNG, DOC
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
