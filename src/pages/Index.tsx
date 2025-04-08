
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, Cloud, Shield, Database, Globe, Upload, Download } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Armazenamento Rápido</span> para Arquivos na Nuvem
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              O Flux Storage simplifica o armazenamento e distribuição de seus arquivos, 
              oferecendo uma CDN rápida e confiável para todas as suas necessidades.
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
            <h2 className="text-3xl font-bold mb-4">Armazenamento Poderoso</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa para armazenar e distribuir arquivos de maneira eficiente e segura.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CDN Distribuída</h3>
              <p className="text-muted-foreground">
                Disponibilize seus arquivos rapidamente com nossa rede de distribuição de conteúdo global.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Simplificado</h3>
              <p className="text-muted-foreground">
                Faça upload de arquivos com facilidade através da nossa interface intuitiva ou API robusta.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança Avançada</h3>
              <p className="text-muted-foreground">
                Proteção de dados de ponta a ponta com criptografia e controle de acesso para seus arquivos.
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
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Armazenamento Escalável</h3>
              <p className="text-muted-foreground">
                Cresça conforme sua necessidade, com opções de armazenamento que se adaptam ao seu projeto.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Downloads Rápidos</h3>
              <p className="text-muted-foreground">
                Compartilhe e acesse seus arquivos rapidamente com nossa infraestrutura otimizada para velocidade.
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
              Cadastre-se hoje e ganhe acesso a todas as funcionalidades do Flux Storage.
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
