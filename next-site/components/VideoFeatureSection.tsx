export default function VideoFeatureSection() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 bg-white w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-20 max-w-7xl mx-auto w-full">
        
        {/* Video Wrapper with Premium Shadow Glow */}
        <div className="w-full lg:w-[42%] max-w-[450px] shadow-premium-glow rounded-2xl overflow-hidden leading-none bg-gray-50 border border-gray-100 hover:border-brand-red/20 transform hover:scale-[1.01]">
          <video controls className="w-full h-auto rounded-2xl block" poster="/3G VETOR branco.png">
            <source src="/qualidade de produto.mov" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start max-w-[650px]">
          <h2 className="text-brand-red text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight uppercase tracking-wide">
            Iluminação Pública de Alta Performance
          </h2>
          
          <p className="text-brand-dark text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Nossos refletores modulares foram desenvolvidos para garantir
            máxima eficiência energética e durabilidade. Com tecnologia LED de
            ponta, oferecemos soluções que transformam a visibilidade urbana,
            trazendo mais segurança e economia para o seu município.
          </p>

          <ul className="flex flex-col gap-3 font-medium text-gray-800 my-2 w-full max-w-[480px]">
            <li className="flex items-center gap-3 justify-center lg:justify-start text-sm sm:text-base text-left">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-red/10 text-brand-red text-[11px] select-none font-bold shrink-0">✔</span>
              <span>Maior vida útil do mercado</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start text-sm sm:text-base text-left">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-red/10 text-brand-red text-[11px] select-none font-bold shrink-0">✔</span>
              <span>Manutenção simplificada</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start text-sm sm:text-base text-left">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-red/10 text-brand-red text-[11px] select-none font-bold shrink-0">✔</span>
              <span>Proteção IP66 contra chuva e poeira</span>
            </li>
          </ul>

          <a
            href="https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-14 w-full sm:w-[280px] bg-brand-red text-white font-bold rounded-lg hover:-translate-y-0.5 hover:bg-red-800 transition-all duration-300 shadow-lg text-center uppercase tracking-wider text-sm cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
