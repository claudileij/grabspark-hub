
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { File, FileText, FileImage, FileSpreadsheet, Presentation, MoreHorizontal, Trash2, Loader } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { BucketFile, getBucketFiles, deleteFile } from "@/services/userService";
import Layout from "@/components/Layout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FilesPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<BucketFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const user = useCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchFiles = async () => {
      try {
        const filesData = await getBucketFiles();
        setFiles(filesData);
      } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
        toast.error("Não foi possível carregar seus arquivos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [navigate, user]);

  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB < 1) return "0 KB";
    
    const units = ["KB", "MB", "GB", "TB", "PB"];
    let size = sizeInKB;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data desconhecida";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm");
  };
  
  const getFileIcon = (fileExtension: string) => {
    const extension = fileExtension.toLowerCase();
    
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (["doc", "docx", "txt", "pdf"].includes(extension)) {
      return <FileText className="h-5 w-5 text-purple-500" />;
    } else if (["xls", "xlsx", "csv"].includes(extension)) {
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    } else if (["ppt", "pptx"].includes(extension)) {
      return <Presentation className="h-5 w-5 text-orange-500" />;
    }
    
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const handleDeleteFile = async (fileName: string, fileExtension: string) => {
    const fileId = `${fileName}.${fileExtension}`;
    setDeletingFile(fileId);
    
    try {
      await deleteFile(fileName, fileExtension);
      setFiles(files.filter(file => 
        `${file.fileName}.${file.fileExtension}` !== fileId
      ));
      toast.success("Arquivo excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      toast.error("Não foi possível excluir o arquivo");
    } finally {
      setDeletingFile(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Meus Arquivos</h1>
          <Button onClick={() => navigate('/upload')}>
            Fazer Upload
          </Button>
        </div>

        <div className="glass-card p-6 rounded-lg shadow-md mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Carregando seus arquivos...</span>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum arquivo encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não fez upload de nenhum arquivo para o seu bucket.
              </p>
              <Button onClick={() => navigate('/upload')}>
                Fazer Upload
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de upload</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index} className="hover:bg-accent/10">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2">
                            {getFileIcon(file.fileExtension)}
                          </div>
                          <span className="font-medium">
                            {file.fileName}.{file.fileExtension}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {file.mimeType}
                      </TableCell>
                      <TableCell>{formatFileSize(file.fileSize)}</TableCell>
                      <TableCell>{formatDate(file.uploadDate)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem
                              onClick={() => handleDeleteFile(file.fileName, file.fileExtension)}
                              className="text-destructive focus:text-destructive"
                              disabled={deletingFile === `${file.fileName}.${file.fileExtension}`}
                            >
                              {deletingFile === `${file.fileName}.${file.fileExtension}` ? (
                                <>
                                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                                  Excluindo...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FilesPage;

