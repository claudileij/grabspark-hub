
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, Cloud, Zap, Shield, Globe } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Requisições Inteligentes</span> para Aplicações Modernas
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A GrabSmart simplifica o processamento de requisições na nuvem, 
              oferecendo uma plataforma unificada para todas as suas necessidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/register">
                  Comece Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/docs">Documentação</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades poderosas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa para gerenciar requisições na nuvem de maneira eficiente e segura.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integração com Múltiplas Nuvens</h3>
              <p className="text-muted-foreground">
                Conecte-se facilmente a AWS, Azure, Google Cloud e outras plataformas em uma interface única.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Desempenho Otimizado</h3>
              <p className="text-muted-foreground">
                Algoritmos inteligentes que minimizam a latência e otimizam o tempo de resposta das suas requisições.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança Avançada</h3>
              <p className="text-muted-foreground">
                Proteção de dados de ponta a ponta com criptografia e autenticação multi-fator em todas as requisições.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rede Global</h3>
              <p className="text-muted-foreground">
                Servidores distribuídos globalmente para garantir baixa latência em qualquer região do mundo.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">APIs Personalizáveis</h3>
              <p className="text-muted-foreground">
                Crie e personalize APIs para atender às necessidades específicas da sua aplicação.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automação de Fluxos</h3>
              <p className="text-muted-foreground">
                Automatize processos com fluxos de trabalho customizáveis e triggers para suas requisições.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center glass-card p-8 md:p-12 rounded-xl bg-gradient-to-br from-accent/40 to-background">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cadastre-se hoje e ganhe acesso a todas as funcionalidades da plataforma GrabSmart.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link to="/register">
                Criar uma conta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
