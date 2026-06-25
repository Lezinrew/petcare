import { Link } from 'react-router-dom';

import { PageHeader } from '../components/layout/PageHeader';

import { Card } from '../components/ui/Card';



const sections = [

  {

    title: 'Quem somos',

    body: 'O PetCare Responsável (PetCareTutor.com) é uma plataforma educativa para tutores de animais. Este aviso explica como tratamos dados pessoais no site, em conformidade com a Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD).',

  },

  {

    title: 'Quais dados coletamos — métricas de navegação',

    body: 'Com seu consentimento no banner de privacidade, registramos dados técnicos de navegação: páginas visitadas (sem parâmetros sensíveis na URL), título da página, rota anterior dentro do app, idioma do navegador, tipo de dispositivo, navegador, sistema operacional (derivado, sem guardar o user-agent completo), localização aproximada via IP (país, estado e cidade quando a infraestrutura fornecer), hostname do site de origem externo (quando você chega de outro domínio), parâmetros UTM de campanha (utm_source, utm_medium, utm_campaign), grupo de espécie acessado no catálogo (ex.: cães, gatos) e hash irreversível do IP para estimar visitantes únicos e sessões. O endereço IP completo não é armazenado.',

  },

  {

    title: 'Quais dados coletamos — perfil demo do tutor',

    body: 'Na tela de perfil (modo demonstração, sem login real), você pode informar voluntariamente nome, cidade, estado, tipo de moradia, experiência com pets e observações. Esses dados ficam vinculados ao usuário demo local e servem para contextualizar pets, lembretes e o simulador de adoção. Não são usados para publicidade nem vendidos.',

  },

  {

    title: 'Para que usamos',

    body: 'As métricas ajudam a entender de onde vêm os acessos, quais espécies e conteúdos interessam mais, horários de maior uso, origem de campanhas (UTM/referrer) e como melhorar a experiência educativa. O perfil demo personaliza ferramentas do tutor no piloto. Não usamos esses dados para publicidade comportamental nem vendemos listas de usuários.',

  },

  {

    title: 'Base legal (LGPD)',

    body: 'Métricas de navegação: consentimento (art. 7º, I), solicitado no banner — você pode recusar sem perder o conteúdo educativo. Perfil demo: execução do serviço solicitado por você no app (art. 7º, V) e, quando aplicável, consentimento ao salvar o formulário. Logs técnicos mínimos (erros, segurança do admin): legítimo interesse (art. 7º, IX), de forma proporcional.',

  },

  {

    title: 'Compartilhamento',

    body: 'Os dados ficam na infraestrutura do próprio projeto (banco MongoDB e API). Não compartilhamos métricas com terceiros para fins comerciais. Provedores de hospedagem podem processar tráfego de rede conforme seus termos, sem acesso direto ao nosso banco de métricas.',

  },

  {

    title: 'Retenção e segurança',

    body: 'Métricas de page view: retemos por até 12 meses para análise agregada, salvo necessidade legítima de prazo menor ou maior documentada. Aplicamos HTTPS, hash de IP, campos derivados em vez de user-agent bruto e acesso administrativo restrito por senha em produção. Registros antigos podem ser excluídos em rotinas futuras de limpeza.',

  },

  {

    title: 'Seus direitos',

    body: 'Você pode, a qualquer momento: revogar o consentimento de métricas (limpe os dados do site no navegador ou use “Recusar” no banner); solicitar informações sobre o tratamento; pedir correção ou exclusão de dados que eventualmente o identifiquem; e apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',

  },

  {

    title: 'Cookies e armazenamento local',

    body: 'O consentimento de métricas é salvo no localStorage (chave petcare-analytics-consent). A sessão administrativa usa sessionStorage no navegador do operador (não é dado do visitante). Preferências de tema também usam armazenamento local. Não utilizamos cookies de rastreamento de terceiros no MVP.',

  },

  {

    title: 'Contato',

    body: 'Para exercer direitos ou tirar dúvidas sobre privacidade, entre em contato pelo canal oficial do PetCareTutor.com indicado no site ou repositório do projeto.',

  },

];



export function PrivacyPolicyPage() {

  return (

    <div className="page-container pb-8">

      <PageHeader

        backTo="/"

        backLabel="← Início"

        title="Privacidade e LGPD"

        subtitle="Como coletamos, usamos e protegemos dados no PetCare Responsável."

      />



      <Card className="mb-6 border-primary/15 bg-primary-light/40 p-4 text-sm leading-relaxed text-brand">

        <p>

          Este documento é informativo e não substitui assessoria jurídica. Foi elaborado com base na LGPD

          (Lei 13.709/2018) para o escopo atual do MVP educativo.

        </p>

      </Card>



      <div className="space-y-6">

        {sections.map((section) => (

          <section key={section.title}>

            <h2 className="text-lg font-bold text-brand">{section.title}</h2>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{section.body}</p>

          </section>

        ))}

      </div>



      <p className="mt-8 text-sm text-text-secondary">

        Última atualização: junho de 2026.{' '}

        <Link to="/" className="font-semibold text-brand hover:underline">

          Voltar ao início

        </Link>

      </p>

    </div>

  );

}
