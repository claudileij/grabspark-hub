
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Database, Calendar, LogOut, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { getUserInfo, UserInfo } from "@/services/userService";
import { isAuthenticated, logoutUser } from "@/services/authService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações do usuário.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    toast({
      title: "Logout efetuado",
      description: "Você foi desconectado da sua conta.",
    });
  };

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
    
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    
    return parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center">
            <p>Carregando dados do usuário...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
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
                  <p className="font-medium text-xs truncate">{userInfo?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Criado em</p>
                  <p className="font-medium">{userInfo?.createdAt ? formatDate(userInfo.createdAt) : "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" />
                Fazer upload
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Ver arquivos
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
              {userInfo?.bucket?.hasBucket ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Nome do bucket</p>
                    <p className="text-lg font-medium">{userInfo.bucket.bucketName}</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Quantidade de arquivos</p>
                    <p className="text-lg font-medium">{userInfo.bucket.objectsAmount}</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Espaço utilizado</p>
                    <p className="text-lg font-medium">{formatSize(userInfo.bucket.bucketSize)}</p>
                  </div>
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
      </div>
    </Layout>
  );
};

export default Dashboard;
