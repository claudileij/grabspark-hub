
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { registerUser, confirmRegister } from "@/services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = registro, 2 = confirmação
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Validation functions
  const validateEmail = (email: string) => {
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    return allowedDomains.includes(domain);
  };

  const validateUsername = (username: string) => {
    return /^[a-z]+$/.test(username);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate username - only lowercase letters
    if (!validateUsername(username)) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "O nome de usuário deve conter apenas letras minúsculas, sem caracteres especiais.",
      });
      return;
    }

    // Validate email domain
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Apenas emails do Gmail, Yahoo, Hotmail ou Outlook são aceitos.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "As senhas não coincidem.",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Você precisa concordar com os termos e condições.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await registerUser({ username, email, password });
      
      if (response.success) {
        toast({
          title: "Código de verificação enviado",
          description: "Verifique seu email para o código de confirmação.",
        });
        
        setStep(2); // Avançar para o passo de verificação
      } else {
        throw new Error("Falha ao registrar");
      }
      
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await confirmRegister({ email, code: verificationCode });
      
      if (response.success) {
        toast({
          title: "Conta confirmada com sucesso",
          description: "Você será redirecionado para o login.",
        });
        
        // Redirecionar após confirmação bem-sucedida
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("Falha na confirmação");
      }
      
    } catch (error) {
      console.error("Erro ao confirmar registro:", error);
      toast({
        variant: "destructive",
        title: "Erro na confirmação",
        description: "Código inválido ou expirado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto glass-card rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {step === 1 ? "Crie sua conta" : "Confirme seu email"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 
                ? "Junte-se ao Flux Storage para armazenar e compartilhar seus arquivos" 
                : "Digite o código de verificação enviado para seu email"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Seu nome de usuário (apenas letras minúsculas)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
                <p className="text-xs text-muted-foreground">Apenas letras minúsculas, sem espaços ou caracteres especiais.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
                <p className="text-xs text-muted-foreground">Apenas emails do Gmail, Yahoo, Hotmail ou Outlook são aceitos.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Escolha uma senha forte"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary/50 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-tight cursor-pointer"
                  >
                    Eu concordo com os{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-base"
                disabled={isLoading || !agreedToTerms}
              >
                {isLoading ? "Cadastrando..." : "Criar conta"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleConfirmation} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Código de verificação</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="bg-secondary/50 text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full text-base"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Confirmar código"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  className="text-sm text-primary hover:underline mt-4"
                >
                  Voltar para o registro
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
