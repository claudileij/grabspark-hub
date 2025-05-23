
import { Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Tester",
      price: "R$5,99",
      period: "mês",
      description: "Ideal para testar o serviço com baixo investimento.",
      storage: "10 GB",
      maxFileSize: "256 MB",
      expiration: "24 horas",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Link direto", included: true },
        { name: "Pré-visualização CDN", included: true },
        { name: "Estatísticas básicas", included: true },
      ],
      popular: false,
      buttonText: "Assinar Tester",
      buttonLink: "/register?plan=tester",
    },
    {
      name: "Pro",
      price: "R$34,90",
      period: "mês",
      description: "Perfeito para desenvolvedores que precisam de mais controle e recursos.",
      storage: "500 GB",
      maxFileSize: "5 GB",
      expiration: "Personalizável",
      features: [
        { name: "Tudo do Tester", included: true },
        { name: "Expiração configurável", included: true },
        { name: "Links personalizáveis", included: true },
        { name: "Acesso via API", included: true },
        { name: "Links com senha", included: true },
      ],
      popular: true,
      buttonText: "Assinar Pro",
      buttonLink: "/register?plan=pro",
    },
    {
      name: "Turbo",
      price: "R$74,90",
      period: "mês",
      description: "Feito para equipes ou profissionais que lidam com grandes volumes de dados.",
      storage: "1 TB",
      maxFileSize: "10 GB",
      expiration: "Personalizável",
      features: [
        { name: "Tudo do Pro", included: true },
        { name: "Suporte prioritário", included: false },
      ],
      popular: false,
      buttonText: "Assinar Turbo",
      buttonLink: "/register?plan=turbo",
    },
    {
      name: "Ultra",
      price: "R$149,90",
      period: "mês",
      description: "A escolha definitiva para empresas e usuários que exigem o máximo desempenho.",
      storage: "5 TB",
      maxFileSize: "20 GB",
      expiration: "Personalizável",
      features: [
        { name: "Tudo do Turbo", included: true },
        { name: "Suporte prioritário", included: true },
      ],
      popular: false,
      buttonText: "Assinar Ultra",
      buttonLink: "/register?plan=ultra",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades de armazenamento e distribuição de arquivos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="border rounded-md p-3 bg-muted/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Armazenamento Total</span>
                      <span className="font-semibold">{plan.storage}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Tamanho máx.</span>
                      <span className="font-semibold">{plan.maxFileSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Expiração</span>
                      <span className="font-semibold">{plan.expiration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                  <Link to={plan.buttonLink}>{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Comparativo Detalhado</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Recursos</TableHead>
                  {pricingPlans.map((plan) => (
                    <TableHead key={plan.name} className="text-center">
                      {plan.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Armazenamento Total</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-storage`} className="text-center">
                      {plan.storage}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tamanho máximo do arquivo</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-maxfile`} className="text-center">
                      {plan.maxFileSize}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expiração de links</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-expiration`} className="text-center">
                      {plan.expiration}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Acesso via API</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-api`} className="text-center">
                      {plan.name === "Pro" || plan.name === "Turbo" || plan.name === "Ultra" ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Links protegidos por senha</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-password`} className="text-center">
                      {plan.name === "Pro" || plan.name === "Turbo" || plan.name === "Ultra" ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Suporte prioritário</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-support`} className="text-center">
                      {plan.name === "Ultra" ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-16 bg-card/50 border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Termos de Uso</h2>
          <div className="space-y-4 text-sm">
            <p>
              1. É proibida a criação de múltiplas contas com o objetivo de burlar os limites do plano Tester ou obter vantagens indevidas.
            </p>
            <p>
              2. Detecção de comportamento abusivo como uso automatizado para mineração de arquivos ou replicação massiva de conteúdo poderá resultar em suspensão da conta.
            </p>
            <p>
              3. O uso de automações para integração legítima com APIs, bots de deploy ou distribuição de arquivos em apps ou sistemas é permitido, desde que siga os limites do plano.
            </p>
            <p>
              4. Todo conteúdo armazenado deve respeitar a legislação vigente e não pode infringir direitos autorais, conter conteúdo ilegal ou ofensivo.
            </p>
            <p>
              5. O armazenamento gratuito é uma oferta promocional e pode ser alterado ou removido conforme a sustentabilidade do serviço.
            </p>
            <p>
              6. Todo o armazenamento do plano pode ser utilizado tanto para armazenamento regular quanto para CDN para visualização e acesso rápido de arquivos em apps e sistemas.
            </p>
          </div>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link to="/terms">Ver termos completos</Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Como funciona o armazenamento?</h3>
              <p className="text-muted-foreground">
                O armazenamento do seu plano pode ser usado tanto para arquivos regulares quanto para distribuição via CDN. Não há separação entre os limites - você decide como utilizar seu espaço total.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Posso mudar de plano a qualquer momento?</h3>
              <p className="text-muted-foreground">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor imediatamente e o valor é calculado proporcionalmente aos dias restantes do ciclo de faturamento.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">O que acontece se eu exceder meus limites?</h3>
              <p className="text-muted-foreground">
                Se você exceder o limite de armazenamento, novos uploads serão temporariamente bloqueados até que você libere espaço ou faça upgrade para um plano com mais capacidade.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Posso ter mais de um usuário na minha conta?</h3>
              <p className="text-muted-foreground">
                Nos planos Turbo e Ultra, é possível adicionar usuários adicionais com diferentes níveis de permissão para gerenciar sua conta. Para os demais planos, oferecemos apenas um usuário por conta.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 glass-card bg-gradient-to-br from-accent/40 to-background rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Escolha o plano ideal para suas necessidades e comece a usar o Flux Storage hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/register">Criar uma conta</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Falar com vendas</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
