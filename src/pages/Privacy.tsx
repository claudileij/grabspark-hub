
import Layout from "@/components/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              Última atualização: 07 de abril de 2025
            </p>
            
            <p className="lead mb-8">
              A FluxStorage valoriza a sua privacidade e está comprometida com a proteção dos seus dados. 
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações 
              ao utilizar nosso serviço.
            </p>
            
            <ScrollArea className="h-[65vh] pr-6 -mr-6">
              <div className="pr-6">
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">📥</span> 1. Informações que coletamos
                </h2>
                <p>
                  Coletamos apenas as informações necessárias para fornecer um serviço funcional, seguro e eficiente:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">a) Dados fornecidos pelo usuário:</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Nome de usuário</li>
                  <li>Endereço de e-mail</li>
                  <li>Senha (armazenada de forma segura)</li>
                  <li>Plano escolhido</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">b) Dados gerados pelo uso:</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>IPs de acesso</li>
                  <li>Histórico de uploads e downloads</li>
                  <li>Estatísticas de visualizações via CDN</li>
                  <li>Logs de API e Webhooks</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">c) Cookies e tecnologias similares:</h3>
                <p>Utilizamos cookies para:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Manter sua sessão ativa</li>
                  <li>Lembrar preferências no painel</li>
                  <li>Realizar análises de uso com ferramentas internas</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">🛠️</span> 2. Uso das informações
                </h2>
                <p>Suas informações são utilizadas para:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Criar e gerenciar sua conta</li>
                  <li>Monitorar o uso do serviço e aplicar limites do plano</li>
                  <li>Proteger sua conta contra acessos não autorizados</li>
                  <li>Gerar estatísticas de uso</li>
                  <li>Melhorar a performance e segurança do serviço</li>
                  <li>Fornecer suporte e responder solicitações</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">🔐</span> 3. Compartilhamento de dados
                </h2>
                <p>
                  Nunca vendemos ou alugamos suas informações. Seus dados só serão compartilhados com:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Provedores de infraestrutura (como servidores, hospedagem, CDN), estritamente para operar o serviço.</li>
                  <li>Autoridades legais, mediante ordem judicial ou solicitação oficial, conforme a legislação brasileira.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">📁</span> 4. Armazenamento e segurança
                </h2>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Seus arquivos são armazenados de forma criptografada em repouso.</li>
                  <li>Todos os acessos ao painel são protegidos via HTTPS.</li>
                  <li>Aplicamos medidas de segurança técnicas e organizacionais para evitar vazamentos, perdas e acessos indevidos.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">🔄</span> 5. Retenção e exclusão de dados
                </h2>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Seus arquivos permanecem armazenados enquanto sua conta estiver ativa ou até que você os delete.</li>
                  <li>Após a exclusão, os dados podem permanecer em backups criptografados por até 30 dias antes de serem permanentemente removidos.</li>
                  <li>Você pode solicitar a exclusão total da sua conta e dados a qualquer momento, entrando em contato com nosso suporte.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">👤</span> 6. Seus direitos
                </h2>
                <p>Conforme a LGPD (Lei Geral de Proteção de Dados), você tem direito a:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incorretos</li>
                  <li>Solicitar exclusão</li>
                  <li>Revogar consentimentos</li>
                  <li>Portar seus dados para outro serviço</li>
                </ul>
                <p>Basta solicitar através do e-mail de suporte disponível em nosso site.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">👶</span> 7. Idade mínima
                </h2>
                <p>Nosso serviço é destinado a maiores de 13 anos. Contas identificadas com idade inferior poderão ser removidas.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">📧</span> 8. Contato
                </h2>
                <p>Em caso de dúvidas ou solicitações relacionadas à sua privacidade, entre em contato:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Email: suporte@fluxstorage.com.br</li>
                  <li>Responsável pelo tratamento de dados: Equipe FluxStorage</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                  <span className="mr-2">🔁</span> 9. Alterações nesta política
                </h2>
                <p>Esta política pode ser atualizada periodicamente. Sempre que houver mudanças significativas, notificaremos você por e-mail ou dentro do painel.</p>
                
                <div className="border-t border-border mt-8 pt-6">
                  <p className="text-sm text-muted-foreground">
                    Última atualização: 07 de abril de 2025
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
