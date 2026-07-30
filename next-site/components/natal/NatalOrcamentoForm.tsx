const WHATSAPP_NUMBER = "5585986559388";
const WHATSAPP_MESSAGE = "Olá! Quero um orçamento da linha natalina 3G.";

/**
 * CTA único de orçamento da home natalina: sem campos de formulário —
 * um botão que já abre o WhatsApp comercial com a mensagem pronta.
 */
export default function NatalOrcamentoForm() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center px-10 bg-natal-gold text-black font-bold hover:bg-white transition-colors uppercase tracking-[0.2em] text-xs cursor-pointer"
    >
      Enviar pelo WhatsApp
    </a>
  );
}
