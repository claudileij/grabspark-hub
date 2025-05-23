
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "@/components/PrivateRoute";
import { initAuthService } from "@/services/authService";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import FilesPage from "@/pages/FilesPage";

// Configure o QueryClient com tratamento de erro padrão
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

// Inicializar serviço de autenticação imediatamente antes de renderizar qualquer componente
initAuthService();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/resources" element={<Resources />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/upload" element={
              <PrivateRoute>
                <Layout>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-6">Gerenciamento de Arquivos</h1>
                    <div className="bg-gradient-to-br from-accent/20 to-background p-6 rounded-lg mb-8">
                      <h2 className="text-xl font-medium mb-2">Upload de Arquivos</h2>
                      <p className="text-muted-foreground mb-4">
                        Faça upload dos seus arquivos com segurança e rapidez.
                      </p>
                    </div>
                    <FileUpload />
                  </div>
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/files" element={
              <PrivateRoute>
                <FilesPage />
              </PrivateRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
