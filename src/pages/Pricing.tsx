
import { Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Gratuito",
      price: "R$0,00",
      period: "mês",
      description: "Perfeito para experimentar o serviço",
      storage: "10 GB",
      cdn: "1 GB/mês",
      maxFileSize: "256 MB",
      expiration: "24 horas",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Geração de link direto", included: true },
        { name: "Pré-visualização via CDN", included: true },
        { name: "Painel de estatísticas básicas", included: true },
        { name: "Expiração personalizável", included: false },
        { name: "Acesso via API", included: false },
        { name: "Links protegidos por senha", included: false },
        { name: "Webhooks", included: false },
        { name: "Analytics avançado", included: false },
        { name: "Suporte prioritário", included: false },
      ],
      popular: false,
      buttonText: "Começar grátis",
      buttonLink: "/register",
    },
    {
      name: "Starter",
      price: "R$14,90",
      period: "mês",
      description: "Para uso pessoal ou pequenos projetos",
      storage: "100 GB",
      cdn: "70 GB/mês",
      maxFileSize: "1 GB",
      expiration: "Personalizável",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Geração de link direto", included: true },
        { name: "Pré-visualização via CDN", included: true },
        { name: "Painel de estatísticas básicas", included: true },
        { name: "Expiração personalizável", included: true },
        { name: "Acesso via API", included: false },
        { name: "Links protegidos por senha", included: false },
        { name: "Webhooks", included: false },
        { name: "Analytics avançado", included: false },
        { name: "Suporte prioritário", included: false },
      ],
      popular: false,
      buttonText: "Assinar Starter",
      buttonLink: "/register?plan=starter",
    },
    {
      name: "Pro",
      price: "R$34,90",
      period: "mês",
      description: "Para profissionais e empresas em crescimento",
      storage: "500 GB",
      cdn: "400 GB/mês",
      maxFileSize: "5 GB",
      expiration: "Personalizável",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Geração de link direto", included: true },
        { name: "Pré-visualização via CDN", included: true },
        { name: "Painel de estatísticas básicas", included: true },
        { name: "Expiração personalizável", included: true },
        { name: "Acesso via API", included: true },
        { name: "Links protegidos por senha", included: true },
        { name: "Webhooks", included: false },
        { name: "Analytics avançado", included: false },
        { name: "Suporte prioritário", included: false },
      ],
      popular: true,
      buttonText: "Assinar Pro",
      buttonLink: "/register?plan=pro",
    },
    {
      name: "Turbo",
      price: "R$74,90",
      period: "mês",
      description: "Para empresas que precisam de alto desempenho",
      storage: "1 TB",
      cdn: "800 GB/mês",
      maxFileSize: "10 GB",
      expiration: "Personalizável",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Geração de link direto", included: true },
        { name: "Pré-visualização via CDN", included: true },
        { name: "Painel de estatísticas básicas", included: true },
        { name: "Expiração personalizável", included: true },
        { name: "Acesso via API", included: true },
        { name: "Links protegidos por senha", included: true },
        { name: "Webhooks", included: true },
        { name: "Analytics avançado", included: true },
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
      description: "Para grandes empresas com necessidades avançadas",
      storage: "5 TB",
      cdn: "4 TB/mês",
      maxFileSize: "20 GB",
      expiration: "Personalizável",
      features: [
        { name: "Upload via painel", included: true },
        { name: "Geração de link direto", included: true },
        { name: "Pré-visualização via CDN", included: true },
        { name: "Painel de estatísticas básicas", included: true },
        { name: "Expiração personalizável", included: true },
        { name: "Acesso via API", included: true },
        { name: "Links protegidos por senha", included: true },
        { name: "Webhooks", included: true },
        { name: "Analytics avançado", included: true },
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-16">
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
                      <span className="text-sm font-medium">Armazenamento</span>
                      <span className="font-semibold">{plan.storage}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">CDN</span>
                      <span className="font-semibold">{plan.cdn}</span>
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
                  <TableCell className="font-medium">CDN mensal</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-cdn`} className="text-center">
                      {plan.cdn}
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
                      {plan.features.find(f => f.name === "Acesso via API")?.included ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Links protegidos por senha</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-password`} className="text-center">
                      {plan.features.find(f => f.name === "Links protegidos por senha")?.included ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Webhooks</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-webhooks`} className="text-center">
                      {plan.features.find(f => f.name === "Webhooks")?.included ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Analytics avançado</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-analytics`} className="text-center">
                      {plan.features.find(f => f.name === "Analytics avançado")?.included ? 
                        <Check className="h-4 w-4 text-primary mx-auto" /> : 
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Suporte prioritário</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${plan.name}-support`} className="text-center">
                      {plan.features.find(f => f.name === "Suporte prioritário")?.included ? 
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
              1. É proibida a criação de múltiplas contas com o objetivo de burlar os limites do plano gratuito ou obter vantagens indevidas.
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
              6. A CDN é destinada para visualização e acesso rápido de arquivos em apps e sistemas. Não é permitida sua utilização como espelho de alto tráfego contínuo.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Como funciona o limite de CDN?</h3>
              <p className="text-muted-foreground">
                O limite de CDN refere-se à quantidade de dados que podem ser transferidos quando seus arquivos são visualizados online. Por exemplo, se você tem um arquivo de 10MB e ele é acessado 100 vezes em um mês, isso consumirá 1GB da sua franquia de CDN.
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
                Se você exceder o limite de armazenamento, novos uploads serão temporariamente bloqueados. Se exceder o limite de CDN, a transferência via CDN será pausada até o próximo ciclo, mas os downloads diretos continuarão funcionando.
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
