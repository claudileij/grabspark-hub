
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Database, FileText, UploadCloud, Download, Share, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { getUserInfo, UserInfo, getBucketFiles, BucketFile } from "@/services/userService";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ShareLinkDialog } from "@/components/ShareLinkDialog";
import { FileStatsDialog } from "@/components/FileStatsDialog";
import { getDownloadUrl } from "@/services/uploadService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [bucketFiles, setBucketFiles] = useState<BucketFile[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<BucketFile | null>(null);
  const user = useCurrentUser();

  useEffect(() => {
    // Bloqueia acesso se não autenticado
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // Fetch user data independently
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações do usuário.",
        });
      } finally {
        setIsLoadingUser(false);
      }
    };

    // Fetch files data independently
    const fetchFilesData = async () => {
      try {
        const files = await getBucketFiles();
        setBucketFiles(files);
      } catch (error) {
        console.error("Erro ao carregar dados de arquivos:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações de arquivos.",
        });
      } finally {
        setIsLoadingFiles(false);
      }
    };

    fetchUserInfo();
    fetchFilesData();
  }, [navigate, toast, user]); // atualiza se user mudar

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSize = (sizeInBytes: number) => {
    if (sizeInBytes === 0) return "0 B";
    
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    
    return parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleViewFilesClick = () => {
    navigate("/files");
  };

  const handleDocsClick = () => {
    navigate("/docs");
  };

  const handleDownload = async (file: BucketFile) => {
    try {
      const downloadUrl = await getDownloadUrl(file._id);
      const link = document.createElement('a');
      link.href = downloadUrl.url;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download iniciado",
        description: `Fazendo download de ${file.fileName}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no download",
        description: "Não foi possível fazer o download do arquivo.",
      });
    }
  };

  const handleShare = (file: BucketFile) => {
    setSelectedFile(file);
    setShareDialogOpen(true);
  };

  const handleStats = (file: BucketFile) => {
    setSelectedFile(file);
    setStatsDialogOpen(true);
  };

  // Calcula o uso atual e progresso
  const currentUsageBytes = bucketFiles.reduce((total, file) => total + file.fileSize, 0);
  const currentUsageMB = currentUsageBytes / (1024 * 1024);
  const limitMB = userInfo ? (userInfo.storageLimit / 1024 / 1024) : 100; // Convert Bytes to MB
  const usagePercentage = Math.min((currentUsageMB / limitMB) * 100, 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informações do usuário */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações do usuário
              </CardTitle>
            </CardHeader>
            {isLoadingUser ? (
              <CardContent className="flex justify-center py-6">
                <p className="text-muted-foreground">Carregando informações do usuário...</p>
              </CardContent>
            ) : (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome de usuário</p>
                    <p className="font-medium">{userInfo?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userInfo?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ID da conta</p>
                    <p className="font-medium text-xs truncate">{userInfo?._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Criado em</p>
                    <p className="font-medium">{userInfo?.createdAt ? formatDate(userInfo.createdAt) : "-"}</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={handleUploadClick}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Fazer upload
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleViewFilesClick}>
                <FileText className="mr-2 h-4 w-4" />
                Ver arquivos
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleDocsClick}>
                <Database className="mr-2 h-4 w-4" />
                Documentação
              </Button>
            </CardContent>
          </Card>

          {/* Bucket */}
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Informações do bucket
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingFiles ? (
                <div className="flex justify-center py-6">
                  <p className="text-muted-foreground">Carregando informações do bucket...</p>
                </div>
              ) : userInfo?.bucket?.hasBucket ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Nome do bucket</p>
                      <p className="text-lg font-medium">{userInfo.bucket.bucketName}</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Quantidade de arquivos</p>
                      <p className="text-lg font-medium">{bucketFiles.length}</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Espaço utilizado</p>
                      <div className="space-y-2">
                        <p className="text-lg font-medium">
                          {formatSize(currentUsageBytes)} / {limitMB}MB
                        </p>
                        <Progress value={usagePercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {usagePercentage.toFixed(1)}% utilizado
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Files List */}
                  {bucketFiles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Arquivos Recentes</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {bucketFiles.slice(0, 5).map((file) => (
                          <div 
                            key={file._id} 
                            className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-border/50"
                          >
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.fileName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatSize(file.fileSize)} • {formatDate(file.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDownload(file)}
                                className="h-8 w-8"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleShare(file)}
                                className="h-8 w-8"
                              >
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleStats(file)}
                                className="h-8 w-8"
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {bucketFiles.length > 5 && (
                        <div className="text-center mt-4">
                          <Button variant="outline" onClick={handleViewFilesClick}>
                            Ver todos os arquivos ({bucketFiles.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Você ainda não possui um bucket criado.</p>
                  <Button className="mt-4" variant="default">
                    Criar bucket
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Dialogs */}
        {selectedFile && (
          <>
            <ShareLinkDialog
              open={shareDialogOpen}
              onOpenChange={setShareDialogOpen}
              fileName={selectedFile.fileName}
              fileId={selectedFile._id}
            />
            <FileStatsDialog
              open={statsDialogOpen}
              onOpenChange={setStatsDialogOpen}
              fileName={selectedFile.fileName}
              fileId={selectedFile._id}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
