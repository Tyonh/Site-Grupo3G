"use client";

import { useEffect, useRef, useState } from "react";

// Observa se o alvo está na viewport (com rootMargin de antecedência) e devolve:
//  - isInView: vira true na primeira vez que o alvo aparece e NÃO volta a false —
//    serve para montar algo uma única vez (ex.: carregar o simulador 3D sob demanda);
//  - isVisible: reflete a visibilidade ao vivo (true ao entrar, false ao sair) —
//    serve para pausar/retomar algo conforme o usuário rola (ex.: o 3D de fundo).
// O observer fica ativo durante toda a vida do componente justamente para o
// isVisible acompanhar a rolagem nos dois sentidos.
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isInView, isVisible };
}
