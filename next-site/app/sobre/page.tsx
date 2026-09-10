import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cardClass =
  "w-full max-w-4xl bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-6 shadow-xl shadow-slate-300/40";

const titleClass =
  "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 text-center";

const title2Class =
  "text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 text-center";

const textClass =
  "text-slate-700 font-normal text-sm sm:text-base lg:text-lg leading-relaxed";

const TIMELINE = [
  {
    label: "Origem",
    year: "1995",
    text: (
      <>
        <strong className="text-brand-red">Ramon Gomez</strong> veio da Espanha ao Brasil empreender no mercado, porém iniciou vendendo curativos adesivos.
      </>
    ),
  },
  {
    label: "Pioneirismo",
    year: "2000",
    text: (
      <>
        Foi criada a <strong className="text-brand-red">Crown</strong>, a pioneira em importação de lâmpadas fluorescentes no Brasil, atuando no Ceará.
      </>
    ),
  },
  {
    label: "Evolução LED",
    year: "2015",
    text: (
      <>
        A Crown se reinventou, passando a se chamar <strong className="text-brand-red">3G Iluminação</strong>, uma distribuidora com tecnologia LED.
      </>
    ),
  },
  {
    label: "Expansão",
    year: "2020",
    text: (
      <>
        Em expansão, nasce a <strong className="text-brand-red">EBRON</strong>, uma empresa 100% cearense, que complementa nossa atuação no mercado.
      </>
    ),
  },
  {
    label: "Hoje",
    year: "ATUAL",
    text: (
      <>
        Composto pela 3G Iluminação e EBRON, somos o <strong className="text-brand-red">Grupo 3G</strong>. Tradição e Inovação trabalhando juntos!
      </>
    ),
    isCurrent: true,
  },
];

export default function SobrePage() {
  return (
    <>
      <Navbar />

      {/* Fundo — degradê claro fixo, sem variante escura */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-radial from-slate-50 via-slate-100 to-slate-200" />

      <div className="relative z-10 w-full flex flex-col bg-transparent items-center px-4 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-28 gap-10 sm:gap-16">
        {/* Section 1: Hero & Philosophy */}
        <section className="w-full flex justify-center">
          <div className={cardClass}>
            {/* Logo do Grupo 3G — placa escura por trás pra dar contraste,
                já que o arquivo é uma marca branca sólida */}
            <div className="flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-charcoal p-3 sm:h-24 sm:w-24">
                <Image
                  src="/grupo-3g-logo.png"
                  alt="Grupo 3G"
                  fill
                  sizes="96px"
                  className="object-contain p-3"
                  priority
                />
              </div>
            </div>

            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase text-center block">
              NOSSA HISTÓRIA E FILOSOFIA
            </span>
            <h1 className={titleClass}>SOBRE O GRUPO 3G</h1>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent my-2" />

            <p className={textClass}>
              Em 1995 iniciamos nossas atividades no Brasil, e desde então trazemos para o mercado os mais variados tipos de iluminação, todas com a mais avançada tecnologia e assim nos tornamos <strong className="text-brand-red font-bold">pioneiros no Ceará com importação de tecnologia LED</strong>.
            </p>

            <p className={textClass}>
              Somos uma empresa moderna e que domina tecnologias de ponta, inovando sempre com o objetivo de fabricarmos produtos competitivos de alta qualidade, ao mesmo tempo em que asseguramos um mínimo impacto no meio ambiente.
            </p>

            <p className={textClass}>
              Somos fiéis à nossa filosofia de desenvolvimento constante e investimos em pesquisa, tecnologia e recursos humanos, o que nos faz atualmente contar com mais de 200 tipos diferentes de produtos, nos tornando referência em todo o estado.
            </p>

            <p className={textClass}>
              Sempre buscando e aperfeiçoando cada vez mais nossa tecnologia de iluminação, hoje com estudos luminotécnicos especializados no segmento industrial, comercial e público estamos conseguindo com nossos produtos oferecer um maior rendimento e <strong className="text-brand-red font-bold">reduzindo em até 50% o consumo de energia</strong>.
            </p>
          </div>
        </section>

        {/* Section 2: Timeline */}
        <section className="w-full flex flex-col items-center">
          <div className={`${cardClass} items-center`}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase text-center block">
              TRAJETÓRIA
            </span>
            <h2 className={title2Class}>LINHA DO TEMPO</h2>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent my-2 mb-4 sm:mb-8" />

            {/* Timeline — empilhada até `lg`; a partir daí vira uma linha
                horizontal com conector. Empilhar até `lg` (não só `md`)
                porque 5 colunas de texto ficam apertadas demais em telas
                intermediárias (tablet retrato). */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4 w-full relative">
              <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-1 bg-brand-red/30 z-0" />

              {TIMELINE.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center flex-1 z-10 w-full max-w-[220px]">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                    {item.label}
                  </div>
                  <div
                    className={`w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg ${
                      item.isCurrent ? "animate-pulse" : ""
                    }`}
                  >
                    {item.year}
                  </div>
                  <p className="text-xs leading-relaxed max-w-[200px] text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
