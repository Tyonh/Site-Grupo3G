import type { Metadata } from "next";
import "./globals.css";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Sem limite de trecho nem de preview: deixa o Google usar o texto e a
      // mídia da página inteira nos resultados ricos e no Discover, em vez do
      // corte curto que é o padrão quando nada é declarado.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

/**
 * Grafo de entidades do site. Dois nós ligados por `@id`: a organização
 * (Grupo 3G, com as duas marcas) e o site em si. Buscadores e assistentes de
 * IA usam isso para responder "quem é a empresa, onde fica, como falar com
 * ela" sem precisar inferir do HTML.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: "3G Iluminação",
      url: siteConfig.url,
      description: siteConfig.description,
      logo: `${siteConfig.url}/grupo-3g-logo.png`,
      // WhatsApp, não o fixo: é o canal real de atendimento do grupo.
      telephone: `+${siteConfig.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Senador Almino, 180 — Praia de Iracema",
        addressLocality: "Fortaleza",
        addressRegion: "CE",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${siteConfig.whatsapp}`,
        availableLanguage: ["Portuguese"],
      },
      areaServed: "BR",
      brand: [
        {
          "@type": "Brand",
          name: "3G Iluminação",
          url: `${siteConfig.url}/3g`,
        },
        {
          "@type": "Brand",
          name: "EBRON",
          url: `${siteConfig.url}/ebron`,
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/3g-ilumina%C3%A7%C3%A3o/",
        "https://www.instagram.com/grupo3giluminacao",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
