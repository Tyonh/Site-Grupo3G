import type { Metadata } from "next";
import GroupNavbar from "@/components/GroupNavbar";
import ReverCookies from "@/components/ReverCookies";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o site do Grupo 3G trata dados pessoais e cookies: o que é coletado, para quê, por quanto tempo e como exercer seus direitos pela LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const ATUALIZADA_EM = "23 de novembro de 2026";

const SECOES: { titulo: string; paragrafos: string[] }[] = [
  {
    titulo: "Quem somos",
    paragrafos: [
      `Este site (${siteConfig.url.replace("https://", "")}) é mantido pelo Grupo 3G, com sede em Fortaleza (CE), responsável pelas marcas 3G Iluminação, EBRON e Natal 3G. Para qualquer assunto sobre seus dados, fale com a gente pelo WhatsApp indicado no fim desta página.`,
    ],
  },
  {
    titulo: "O que coletamos",
    paragrafos: [
      "O site não tem cadastro nem formulário: você navega sem informar nome, e-mail ou telefone.",
      "Quando você clica em um botão de WhatsApp, a conversa acontece no aplicativo do WhatsApp, e os dados que você enviar por lá seguem também a política de privacidade do WhatsApp (Meta). Usamos essas mensagens só para responder ao seu contato e preparar orçamentos.",
      "Se — e somente se — você aceitar os cookies de análise, usamos o Google Analytics 4 para medir de forma estatística as páginas visitadas, o tempo na página, o tipo de aparelho e navegador e a cidade aproximada de acesso. O Google Analytics 4 não registra o endereço IP completo. Esses dados não identificam você pelo nome e não são usados para publicidade.",
    ],
  },
  {
    titulo: "Cookies",
    paragrafos: [
      "Ao aceitar, o Google Analytics grava os cookies _ga e _ga_<ID>, que duram até 2 anos e servem para diferenciar visitas de um mesmo navegador.",
      "Também guardamos no seu próprio navegador (localStorage, chave cookie-consent) a escolha que você fez no aviso, para não perguntar de novo a cada página. Essa informação não é enviada para nós.",
      "Se você recusar, nenhum cookie de análise é criado e o Google Analytics não é carregado.",
    ],
  },
  {
    titulo: "Base legal e compartilhamento",
    paragrafos: [
      "Os dados de análise são tratados com base no seu consentimento (art. 7º, I, da LGPD), que pode ser retirado a qualquer momento. Eles são processados pelo Google, que atua como operador; não vendemos nem repassamos dados a terceiros.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      "Pela LGPD (art. 18) você pode pedir confirmação de que tratamos seus dados, acesso, correção, eliminação, informação sobre compartilhamento e revogação do consentimento. Basta falar com a gente pelo WhatsApp; respondemos em até 15 dias.",
    ],
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <>
      <GroupNavbar variant="solid" />
      <main className="flex-1 bg-brand-charcoal text-white">
        <article className="mx-auto max-w-3xl px-4 py-20 sm:px-8 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">LGPD</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-white/45">Atualizada em {ATUALIZADA_EM}</p>

          {SECOES.map((s) => (
            <section key={s.titulo} className="mt-12 border-t border-white/10 pt-8">
              <h2 className="text-lg font-black uppercase tracking-tight">{s.titulo}</h2>
              {s.paragrafos.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 font-light leading-relaxed text-white/75">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-lg font-black uppercase tracking-tight">Mudar sua escolha</h2>
            <p className="mt-4 font-light leading-relaxed text-white/75">
              Você pode rever a qualquer momento o que decidiu no aviso de cookies. Se tinha aceitado, os
              cookies de análise são apagados e o aviso volta a aparecer.
            </p>
            <div className="mt-6">
              <ReverCookies />
            </div>
          </section>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-lg font-black uppercase tracking-tight">Contato</h2>
            <p className="mt-4 font-light leading-relaxed text-white/75">
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline underline-offset-4"
              >
                +55 (85) 98655-9388
              </a>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
