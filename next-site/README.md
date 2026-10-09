This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Atualização da página Homologada

A rota `/produtos/luminaria-homologada` utiliza o modelo final de 50 W e a curva de referência do ensaio de 200 W. A apresentação e o cenário são gerados pelos componentes do site; não dependem de arquivos de trabalho em `artifacts`.

As mídias em `public/` são ignoradas pelo Git e precisam ser enviadas separadamente para a VPS, preservando os caminhos:

- `public/models/Homologada50W.web.glb`
- `public/homologada-final-poster.png`
- `public/photometry/homologada-200w-relatorio.pdf`
- `public/hdri/studio_small_03_1k.hdr` (já existente; conferir no servidor)

Os dados da curva estão em `lib/data/homologada-200w-photometry.json` e acompanham o código. Antes de atualizar o servidor, executar `npm run build` dentro de `next-site`.

## Atualização da página Ebron

A rota `/produtos/ebron` usa o modelo reconstruído de 50 W e uma cena visual de instalação e iluminação. A área iluminada é ilustrativa, sem curva fotométrica atribuída à Ebron.

Enviar separadamente para a VPS, preservando estes caminhos ignorados pelo Git:

- `public/models/Ebron50W.web.glb`
- `public/ebron50w-poster.png`
- `public/hdri/studio_small_03_1k.hdr` (já existente; conferir no servidor)
