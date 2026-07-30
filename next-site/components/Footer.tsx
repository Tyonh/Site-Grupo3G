export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-12 pb-6 px-[5%] w-full relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start flex-wrap gap-8">
        
        {/* Navigation Column */}
        <div className="flex-1 min-w-[200px] mb-5">
          <h3 className="text-lg font-bold mb-5 tracking-wide">Navegação Rápida</h3>
          <ul className="flex flex-col gap-3 font-light text-gray-300">
            <li>
              <a
                href="/sobre"
                className="hover:text-brand-red transition-colors duration-300"
              >
                Sobre Nós
              </a>
            </li>
            <li>
              <a
                href="/natal"
                className="hover:text-brand-red transition-colors duration-300"
              >
                Natal
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex-1 min-w-[200px] mb-5 text-gray-300 font-light">
          <h3 className="text-lg font-bold mb-5 tracking-wide text-white">Contato</h3>
          <p className="leading-relaxed mb-3">
            Rua Senador Almino, 180<br />
            Praia de Iracema - Fortaleza - Ceará, Brasil
          </p>
          <p className="leading-relaxed font-normal text-white">
            85 3077.3323 | 85 98655-9388
          </p>
        </div>

        {/* Social Column */}
        <div className="flex-1 min-w-[200px] mb-5 flex md:justify-end">
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/3g-ilumina%C3%A7%C3%A3o/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin"
              className="p-3 bg-white/10 hover:bg-brand-red rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin text-white"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            
            <a
              href="https://www.instagram.com/grupo3giluminacao?igsh=MWpmZGxmNHhzbGd1eg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 bg-white/10 hover:bg-brand-red rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram text-white"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs md:text-sm text-gray-500 font-light tracking-wide uppercase">
        <p>2025 ® 3G. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
