import { useState } from "react";
import { Copy, ChevronDown, ChevronRight, Code, Key, User, FileText, Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";

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

  const MethodBadge = ({ method }: { method: string }) => {
    const colors = {
      GET: "bg-green-600",
      POST: "bg-blue-600", 
      PATCH: "bg-yellow-600",
      DELETE: "bg-red-600"
    };
    
    return (
      <Badge className={`${colors[method as keyof typeof colors]} text-white font-mono text-xs`}>
        {method}
      </Badge>
    );
  };

  const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => copyToClipboard(code)}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );

  const EndpointSection = ({ method, endpoint, title, description, icon: Icon, requestBody, successResponse, errorResponses, children }: EndpointProps) => {
    const sectionId = `${method}-${endpoint}`;
    const isExpanded = expandedSections.includes(sectionId);

    return (
      <Card className="mb-6">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection(sectionId)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <div className="flex items-center gap-3">
                <MethodBadge method={method} />
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{endpoint}</code>
              </div>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="space-y-6">
            {requestBody && (
              <div>
                <h4 className="font-semibold mb-2">Request Body:</h4>
                <CodeBlock code={JSON.stringify(requestBody, null, 2)} />
              </div>
            )}
            
            {successResponse && (
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Success Response:</h4>
                <CodeBlock code={JSON.stringify(successResponse, null, 2)} />
              </div>
            )}
            
            {errorResponses && errorResponses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-red-600">Error Responses:</h4>
                {errorResponses.map((error, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-sm font-medium mb-2">{error.status}: {error.description}</p>
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
          <p className="text-muted-foreground mb-6">
            Documentação completa da API, detalhando todos os endpoints disponíveis, métodos, corpos de requisição e respostas esperadas.
          </p>
          
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Autenticação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Todas as rotas protegidas requerem um token JWT válido no header Authorization:
              </p>
              <CodeBlock code={`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`} language="http" />
            </CardContent>
          </Card>
        </div>

        {/* Authentication Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Key className="h-6 w-6" />
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
        </div>

        {/* Users Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <User className="h-6 w-6" />
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
        </div>

        {/* Files Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6" />
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
        </div>

        {/* Base URL */}
        <Card>
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock code="https://api.example.com" language="text" />
            <p className="text-sm text-muted-foreground mt-2">
              Substitua pela URL base real da sua API.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocsPage;