
import Layout from "@/components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar os serviços do Flux Storage, você concorda com estes Termos de Uso em sua totalidade.
              Se você não concordar com estes termos, por favor, não utilize nossos serviços.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Descrição do Serviço</h2>
            <p>
              O Flux Storage é uma plataforma de armazenamento e distribuição de arquivos na nuvem que permite aos usuários
              fazer upload, armazenar, compartilhar e gerenciar arquivos digitais.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Contas de Usuário</h2>
            <p>
              É proibida a criação de múltiplas contas com o objetivo de burlar os limites de uso ou obter 
              vantagens indevidas. A detecção de tal comportamento poderá resultar na suspensão permanente de todas as 
              contas associadas.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Uso Aceitável</h2>
            <p>
              Você concorda em utilizar o Flux Storage apenas para propósitos legais e de acordo com estes termos. 
              Especificamente, você concorda em não:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Utilizar nossos serviços para armazenar, publicar ou transmitir qualquer material que seja ilegal, 
                difamatório, ofensivo, obsceno ou que viole direitos autorais.
              </li>
              <li>
                Utilizar comportamento abusivo como uso automatizado para mineração de arquivos ou replicação massiva 
                de conteúdo que possa sobrecarregar nossa infraestrutura.
              </li>
              <li>
                Tentar acessar, interferir ou utilizar áreas não públicas do serviço, sistemas de computadores ou 
                sistemas técnicos de entrega dos nossos prestadores de serviços.
              </li>
              <li>
                Utilizar a CDN como espelho de alto tráfego contínuo. A CDN é destinada para visualização e acesso 
                rápido de arquivos em apps e sistemas.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Uso de Automações</h2>
            <p>
              O uso de automações para integração legítima com APIs, bots de deploy ou distribuição de arquivos em apps 
              ou sistemas é permitido, desde que siga os limites do plano contratado.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Conteúdo do Usuário</h2>
            <p>
              Todo conteúdo armazenado deve respeitar a legislação vigente e não pode infringir direitos autorais, 
              conter conteúdo ilegal ou ofensivo. O Flux Storage reserva-se o direito de remover qualquer conteúdo que 
              viole estes termos ou a legislação aplicável.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitações de Serviço</h2>
            <p>
              Nos reservamos o direito de impor limitações de uso, incluindo, mas não limitado a, espaço de 
              armazenamento, banda de transferência e período de retenção de arquivos, conforme necessário para manter 
              a qualidade e estabilidade do serviço.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Privacidade</h2>
            <p>
              Nossa Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais ao 
              utilizar nossos serviços. Ao utilizar o Flux Storage, você concorda com nossa coleta e uso de informações 
              conforme descrito em nossa Política de Privacidade.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Alterações nos Termos</h2>
            <p>
              Podemos modificar estes Termos de Uso periodicamente. Ao continuar a utilizar o Flux Storage após a 
              publicação de alterações, você concorda com os termos modificados.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Rescisão</h2>
            <p>
              Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, a nosso exclusivo critério, 
              se violar estes Termos de Uso ou se envolver-se em condutas que consideremos prejudiciais aos outros usuários, 
              a nós ou a terceiros.
            </p>
            
            <div className="border-t border-border mt-8 pt-6">
              <p className="text-sm text-muted-foreground">
                Última atualização: 08 de abril de 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
