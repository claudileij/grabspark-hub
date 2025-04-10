
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Mail, KeyRound, AlertTriangle, Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  requestPasswordRecovery, 
  verifyRecoveryCode, 
  confirmPasswordRecovery 
} from "@/services/authService";

// Step 1: Email validation schema
const emailSchema = z.object({
  email: z.string().email("Digite um email válido"),
});

// Step 2: Code validation schema
const codeSchema = z.object({
  code: z.string().length(6, "O código deve ter 6 dígitos"),
});

// Step 3: Password validation schema
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type CodeFormValues = z.infer<typeof codeSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  // Step 1: Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Step 2: Code form
  const codeForm = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  // Step 3: Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Step 1: Request password recovery
  const handleRequestRecovery = async (values: EmailFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await requestPasswordRecovery(values.email);
      
      if (response.success) {
        toast.success("Código enviado para seu email");
        setEmail(values.email);
        setStep(2);
      } else {
        toast.error("Falha ao enviar o código. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      toast.error("Ocorreu um erro ao processar sua solicitação");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify recovery code
  const handleVerifyCode = async (values: CodeFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await verifyRecoveryCode(email, values.code);
      
      if (response.success) {
        toast.success("Código verificado com sucesso");
        setCode(values.code);
        setStep(3);
      } else {
        toast.error("Código inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      toast.error("Ocorreu um erro ao processar sua solicitação");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Confirm password recovery
  const handleConfirmRecovery = async (values: PasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await confirmPasswordRecovery(email, code, values.password);
      
      if (response.success) {
        setSuccessDialogOpen(true);
      } else {
        toast.error("Falha ao redefinir senha. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      toast.error("Ocorreu um erro ao processar sua solicitação");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to login page after successful password reset
  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate("/login");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto glass-card rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Recuperar Senha</h1>
            <p className="text-muted-foreground">
              {step === 1 && "Informe seu email para receber o código de recuperação"}
              {step === 2 && "Digite o código de 6 dígitos enviado para seu email"}
              {step === 3 && "Defina sua nova senha"}
            </p>
          </div>

          {/* Step 1: Email Form */}
          {step === 1 && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleRequestRecovery)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="seu@email.com"
                            className="bg-secondary/50 pl-10"
                            {...field}
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Voltar ao login
                  </Link>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar código"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 2: Code Verification Form */}
          {step === 2 && (
            <Form {...codeForm}>
              <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-6">
                <FormField
                  control={codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Código de verificação</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                          containerClassName="justify-center gap-2"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="border-input" />
                            <InputOTPSlot index={1} className="border-input" />
                            <InputOTPSlot index={2} className="border-input" />
                            <InputOTPSlot index={3} className="border-input" />
                            <InputOTPSlot index={4} className="border-input" />
                            <InputOTPSlot index={5} className="border-input" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground text-center">
                        Digite o código de 6 dígitos enviado para {email}
                      </p>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Voltar
                  </Button>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Verificando..." : "Verificar"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handleConfirmRecovery)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-secondary/50 pl-10 pr-10"
                            {...field}
                          />
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                            <span className="sr-only">
                              {showPassword ? "Ocultar senha" : "Mostrar senha"}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-secondary/50 pl-10 pr-10"
                            {...field}
                          />
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Voltar
                  </Button>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Alterando..." : "Alterar senha"}
                    {!isLoading && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={handleSuccessDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Senha alterada com sucesso
            </DialogTitle>
            <DialogDescription>
              Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleSuccessDialogClose}>
              Ir para o login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ForgotPassword;
