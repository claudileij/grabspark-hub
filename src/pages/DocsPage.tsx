import { useState } from "react";
import { Copy, ChevronDown, ChevronRight, Code, Key, User, FileText, Download, Trash2, Upload, Book, Hash, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EndpointProps {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  requestBody?: any;
  successResponse?: any;
  errorResponses?: Array<{ status: string; description: string; example: any }>;
  children?: React.ReactNode;
}

const DocsPage = () => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const MethodBadge = ({ method }: { method: string }) => {
    const colors = {
      GET: "bg-emerald-500/90 hover:bg-emerald-500",
      POST: "bg-blue-500/90 hover:bg-blue-500", 
      PATCH: "bg-amber-500/90 hover:bg-amber-500",
      DELETE: "bg-red-500/90 hover:bg-red-500"
    };
    
    return (
      <Badge className={`${colors[method as keyof typeof colors]} text-white font-mono text-xs border-0`}>
        {method}
      </Badge>
    );
  };

  const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => (
    <div className="relative group">
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-700 font-mono leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700 text-slate-200"
        onClick={() => copyToClipboard(code)}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );

  const EndpointSection = ({ method, endpoint, title, description, icon: Icon, requestBody, successResponse, errorResponses, children }: EndpointProps) => {
    const sectionId = `${method}-${endpoint.replace(/[^\w]/g, '-')}`;
    const isExpanded = expandedSections.includes(sectionId);

    return (
      <Card className="mb-6 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" id={sectionId}>
        <CardHeader 
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          onClick={() => toggleSection(sectionId)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <div className="flex items-center gap-3">
                <MethodBadge method={method} />
                <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  {endpoint}
                </code>
              </div>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
          </div>
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">{title}</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
            {requestBody && (
              <div>
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Request Body:
                </h4>
                <CodeBlock code={JSON.stringify(requestBody, null, 2)} />
              </div>
            )}
            
            {successResponse && (
              <div>
                <h4 className="font-semibold mb-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Success Response:
                </h4>
                <CodeBlock code={JSON.stringify(successResponse, null, 2)} />
              </div>
            )}
            
            {errorResponses && errorResponses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Error Responses:
                </h4>
                {errorResponses.map((error, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">{error.status}: {error.description}</p>
                    <CodeBlock code={JSON.stringify(error.example, null, 2)} />
                  </div>
                ))}
              </div>
            )}
            
            {children}
          </CardContent>
        )}
      </Card>
    );
  };

  const navigationItems = [
    { title: "Autenticação", icon: Key, id: "auth", items: [
      { title: "Login", id: "POST-auth-login" }
    ]},
    { title: "Usuários", icon: User, id: "users", items: [
      { title: "Iniciar Registro", id: "POST-users-register-send-code" },
      { title: "Confirmar Registro", id: "POST-users-register-confirm" },
      { title: "Solicitar Recuperação", id: "POST-users-recovery-send-code" },
      { title: "Confirmar Recuperação", id: "POST-users-recovery-confirm" },
      { title: "Perfil do Usuário", id: "GET-users-me" },
      { title: "Atualizar Perfil", id: "PATCH-users--id" }
    ]},
    { title: "Arquivos", icon: FileText, id: "files", items: [
      { title: "Solicitar URL de Upload", id: "POST-files-upload-url" },
      { title: "Confirmar Upload", id: "POST-files-upload-complete" },
      { title: "Listar Arquivos", id: "GET-files" },
      { title: "URL de Download", id: "GET-files--id-download-url" },
      { title: "Deletar Arquivo", id: "DELETE-files--id" }
    ]}
  ];

  const AppSidebar = () => (
    <Sidebar className="w-80 border-r border-slate-200 dark:border-slate-700">
      <SidebarContent className="bg-slate-50 dark:bg-slate-900">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            API Documentation
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Documentação completa da API
          </p>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          {navigationItems.map((section) => (
            <SidebarGroup key={section.id} className="mb-4">
              <SidebarGroupLabel className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 mb-2">
                <section.icon className="h-4 w-4" />
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => scrollToSection(item.id)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Hash className="h-3 w-3 mr-2" />
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-10 h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <SidebarTrigger className="text-slate-700 dark:text-slate-300" />
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">API Reference</span>
            </div>
          </header>

          <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Introduction */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">API Documentation</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Documentação completa da API, detalhando todos os endpoints disponíveis, métodos, corpos de requisição e respostas esperadas.
              </p>
              
              {/* Authentication Info */}
              <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <Key className="h-5 w-5" />
                    Autenticação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-blue-800 dark:text-blue-200">
                    Todas as rotas protegidas requerem um token JWT válido no header Authorization:
                  </p>
                  <CodeBlock code={`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`} language="http" />
                </CardContent>
              </Card>

              {/* Base URL */}
              <Card className="mb-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Base URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code="https://api.example.com" language="text" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                    Substitua pela URL base real da sua API.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Authentication Endpoints */}
            <section className="mb-12" id="auth">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <Key className="h-7 w-7 text-primary" />
                Autenticação
              </h2>
              
              <EndpointSection
                method="POST"
                endpoint="/auth/login"
                title="Login"
                description="Autentica um usuário existente e retorna um JWT para uso em rotas protegidas."
                icon={Key}
                requestBody={{
                  email: "john@example.com",
                  password: "securePass123"
                }}
                successResponse={{
                  success: true,
                  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  user: {
                    id: "64b82c2a3a57b80017cfe0d1",
                    email: "john@example.com",
                    username: "JohnDoe"
                  }
                }}
                errorResponses={[
                  {
                    status: "401 Unauthorized",
                    description: "Email ou senha inválidos",
                    example: {
                      code: 1011,
                      message: "Invalid email or password"
                    }
                  }
                ]}
              />
            </section>

            {/* Users Endpoints */}
            <section className="mb-12" id="users">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <User className="h-7 w-7 text-primary" />
                Usuários
              </h2>
              
              <EndpointSection
                method="POST"
                endpoint="/users/register/send-code"
                title="Iniciar Registro"
                description="Inicia o processo de registro enviando um código de verificação de 6 caracteres para o email do usuário."
                icon={User}
                requestBody={{
                  username: "JohnDoe",
                  email: "john@example.com",
                  password: "SecurePass123!"
                }}
                successResponse={{
                  success: true,
                  message: "Verification code sent successfully!"
                }}
                errorResponses={[
                  {
                    status: "400 Bad Request",
                    description: "Usuário já existe e está verificado",
                    example: {
                      code: 11000,
                      message: "User already exists"
                    }
                  }
                ]}
              />

              <EndpointSection
                method="POST"
                endpoint="/users/register/confirm"
                title="Confirmar Registro"
                description="Confirma o código de verificação, ativa o usuário e cria seu bucket S3 para armazenamento."
                icon={User}
                requestBody={{
                  email: "john@example.com",
                  code: "A1B2C3"
                }}
                successResponse={{
                  success: true,
                  message: "User verified successfully. Please log in."
                }}
                errorResponses={[
                  {
                    status: "400 Bad Request",
                    description: "Código inválido ou expirado",
                    example: {
                      code: 1001,
                      message: "Verification code is invalid or expired"
                    }
                  }
                ]}
              />

              <EndpointSection
                method="POST"
                endpoint="/users/recovery/send-code"
                title="Solicitar Recuperação"
                description="Envia um código de recuperação de senha para o email do usuário."
                icon={User}
                requestBody={{
                  email: "john@example.com"
                }}
                successResponse={{
                  success: true,
                  message: "If a user with that email exists, a recovery code has been sent."
                }}
              />

              <EndpointSection
                method="POST"
                endpoint="/users/recovery/confirm"
                title="Confirmar Recuperação"
                description="Confirma o código de recuperação e atualiza a senha do usuário."
                icon={User}
                requestBody={{
                  email: "john@example.com",
                  code: "D4E5F6",
                  newPassword: "NewSecurePassword456!"
                }}
                successResponse={{
                  success: true,
                  message: "Password has been reset successfully."
                }}
                errorResponses={[
                  {
                    status: "400 Bad Request",
                    description: "Código inválido ou expirado",
                    example: {
                      message: "Invalid or expired recovery code."
                    }
                  }
                ]}
              />

              <EndpointSection
                method="GET"
                endpoint="/users/me"
                title="Perfil do Usuário"
                description="Obtém o perfil do usuário autenticado. Requer JWT válido no header Authorization."
                icon={User}
                successResponse={{
                  _id: "64b82c2a3a57b80017cfe0d1",
                  username: "JohnDoe",
                  email: "john@example.com",
                  bucket: {
                    hasBucket: true,
                    bucketName: "adjective-color-animal",
                    objectsAmount: 0,
                    bucketSize: 0
                  },
                  storageLimit: 102400,
                  isVerified: true,
                  createdAt: "2025-08-13T09:23:00.000Z",
                  updatedAt: "2025-08-13T09:23:00.000Z"
                }}
                errorResponses={[
                  {
                    status: "401 Unauthorized",
                    description: "JWT ausente ou inválido",
                    example: {
                      message: "Unauthorized"
                    }
                  }
                ]}
              />

              <EndpointSection
                method="PATCH"
                endpoint="/users/:id"
                title="Atualizar Perfil"
                description="Atualiza parcialmente o perfil do usuário. Requer que o usuário autenticado seja o proprietário do perfil."
                icon={User}
                requestBody={{
                  username: "JohnnyDoe"
                }}
                errorResponses={[
                  {
                    status: "403 Forbidden",
                    description: "Não autorizado a atualizar este perfil",
                    example: {
                      message: "Forbidden"
                    }
                  }
                ]}
              />
            </section>

            {/* Files Endpoints */}
            <section className="mb-12" id="files">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <FileText className="h-7 w-7 text-primary" />
                Arquivos
              </h2>
              
              <EndpointSection
                method="POST"
                endpoint="/files/upload-url"
                title="Solicitar URL de Upload"
                description="Solicita uma URL pré-assinada segura para fazer upload de arquivo diretamente para o S3. Verifica se há espaço suficiente."
                icon={Upload}
                requestBody={{
                  fileName: "my-photo.jpg",
                  fileSize: 1048576,
                  mimeType: "image/jpeg"
                }}
                successResponse={{
                  presignedPost: {
                    url: "https://bucket-name.s3.amazonaws.com/",
                    fields: {
                      key: "user-id/nanoid/my-photo.jpg",
                      AWSAccessKeyId: "...",
                      policy: "...",
                      signature: "..."
                    }
                  },
                  fileKey: "user-id/nanoid/my-photo.jpg"
                }}
                errorResponses={[
                  {
                    status: "400 Bad Request",
                    description: "Espaço de armazenamento insuficiente",
                    example: {
                      message: "Insufficient storage space"
                    }
                  }
                ]}
              />

              <EndpointSection
                method="POST"
                endpoint="/files/upload-complete"
                title="Confirmar Upload"
                description="Confirma que um arquivo foi carregado com sucesso no S3. Cria registro no banco e atualiza uso de armazenamento."
                icon={Upload}
                requestBody={{
                  fileKey: "user-id/nanoid/my-photo.jpg",
                  fileName: "my-photo.jpg",
                  fileSize: 1048576,
                  mimeType: "image/jpeg"
                }}
                successResponse={{
                  success: true,
                  message: "Upload confirmed.",
                  file: {
                    _id: "64b82c2a3a57b80017cfe0d2",
                    ownerId: "64b82c2a3a57b80017cfe0d1",
                    fileName: "my-photo.jpg",
                    fileKey: "user-id/nanoid/my-photo.jpg",
                    fileSize: 1048576,
                    mimeType: "image/jpeg",
                    createdAt: "2025-08-13T10:00:00.000Z",
                    updatedAt: "2025-08-13T10:00:00.000Z"
                  }
                }}
              />

              <EndpointSection
                method="GET"
                endpoint="/files"
                title="Listar Arquivos"
                description="Obtém uma lista de todos os arquivos carregados pelo usuário autenticado."
                icon={FileText}
                successResponse={[
                  {
                    _id: "64b82c2a3a57b80017cfe0d2",
                    ownerId: "64b82c2a3a57b80017cfe0d1",
                    fileName: "my-photo.jpg",
                    fileKey: "user-id/nanoid/my-photo.jpg",
                    fileSize: 1048576,
                    mimeType: "image/jpeg",
                    createdAt: "2025-08-13T10:00:00.000Z",
                    updatedAt: "2025-08-13T10:00:00.000Z"
                  }
                ]}
              />

              <EndpointSection
                method="GET"
                endpoint="/files/:id/download-url"
                title="URL de Download"
                description="Gera uma URL pré-assinada segura e temporária para download de arquivo específico diretamente do S3."
                icon={Download}
                successResponse={{
                  url: "https://bucket-name.s3.amazonaws.com/user-id/nanoid/my-photo.jpg?..."
                }}
                errorResponses={[
                  {
                    status: "404 Not Found",
                    description: "Arquivo não encontrado ou sem permissão",
                    example: {
                      message: "File not found"
                    }
                  }
                ]}
              />

              <EndpointSection
                method="DELETE"
                endpoint="/files/:id"
                title="Deletar Arquivo"
                description="Remove um arquivo do bucket S3 e seu registro correspondente do banco de dados."
                icon={Trash2}
                successResponse={{
                  success: true,
                  message: "File deleted successfully."
                }}
                errorResponses={[
                  {
                    status: "404 Not Found",
                    description: "Arquivo não encontrado ou sem permissão",
                    example: {
                      message: "File not found"
                    }
                  }
                ]}
              />
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DocsPage;