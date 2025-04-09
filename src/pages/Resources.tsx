
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Layout from "@/components/Layout";
import { Upload, ArrowRight, Download, Eye, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Animated feature card component
const FeatureCard = ({ title, description, icon: Icon, index }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isIntersecting 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-foreground/80">{description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

// Resources page component
const ResourcesPage = () => {
  const features = [
    {
      title: "Upload via painel",
      description: "Arraste e solte arquivos diretamente no painel web, com upload de múltiplos arquivos simultaneamente. Interface intuitiva que facilita o gerenciamento do seu armazenamento.",
      icon: Upload
    },
    {
      title: "Geração de link direto",
      description: "Obtenha links diretos para compartilhar seus arquivos instantaneamente após o upload. Os links são únicos e podem ser compartilhados facilmente em qualquer plataforma.",
      icon: ArrowRight
    },
    {
      title: "Expiração de link",
      description: "No plano gratuito, os links expiram automaticamente em 24 horas. Nos planos pagos, configure a validade dos links de acordo com suas necessidades, desde horas até nunca expirar.",
      icon: Info
    },
    {
      title: "Pré-visualização via CDN",
      description: "Visualize imagens, documentos e outros arquivos diretamente no navegador sem precisar baixá-los. Nossa CDN otimiza a entrega para uma experiência rápida, respeitando a franquia do seu plano.",
      icon: Eye
    },
    {
      title: "Estatísticas de uso",
      description: "Acompanhe detalhes como espaço utilizado, banda consumida e visualizações de arquivos. Nosso painel oferece gráficos intuitivos para monitorar o uso dos seus recursos.",
      icon: Info
    },
    {
      title: "Download simplificado",
      description: "Seus usuários podem baixar os arquivos com facilidade, sem cadastros ou complicações. Baixe arquivos diretamente ou através de nossa API para integrações avançadas nos planos pagos.",
      icon: Download
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Recursos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça todas as funcionalidades que o Flux Storage oferece para 
            armazenamento e distribuição eficiente de seus arquivos.
          </p>
        </div>

        <div className="relative">
          <ScrollArea className="h-[70vh] rounded-md border p-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pr-4">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
