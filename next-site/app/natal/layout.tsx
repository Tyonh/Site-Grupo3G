import type { ReactNode } from "react";
import FloatingWhatsApp from "@/components/natal/FloatingWhatsApp";

/**
 * Layout da seção /natal — aplica o botão flutuante de WhatsApp a todas as
 * páginas da coleção (home + cada grupo em /natal/[categoria]) sem duplicar
 * a marcação em cada uma.
 */
export default function NatalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingWhatsApp />
    </>
  );
}
