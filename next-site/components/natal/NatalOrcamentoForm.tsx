"use client";

import { useState } from "react";
import { natalCategories } from "@/lib/natalCatalog";

const WHATSAPP_NUMBER = "5585986559388";

/**
 * CTA único de orçamento da home natalina: em vez de seletor de perfil,
 * a finalidade e a quantidade vêm naturalmente no formulário e são
 * enviadas como mensagem pré-preenchida no WhatsApp comercial.
 */
export default function NatalOrcamentoForm() {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purpose, setPurpose] = useState("");

  const buildWhatsAppUrl = () => {
    const parts = ["Olá! Quero um orçamento da linha natalina 3G."];
    if (category) parts.push(`Produto: ${category}.`);
    if (quantity) parts.push(`Quantidade: ${quantity}.`);
    if (purpose) parts.push(`Finalidade: ${purpose}.`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(" "))}`;
  };

  return (
    <form
      className="w-full max-w-xl flex flex-col gap-4 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
            Produto de interesse
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 px-4 bg-white/5 text-white text-sm font-medium border border-white/20 focus:border-natal-gold outline-none"
          >
            <option value="">Quero uma sugestão</option>
            {natalCategories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
            Quantidade aproximada
          </span>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ex: 10 unidades, 200 metros…"
            className="h-12 px-4 bg-white/5 text-white text-sm font-medium border border-white/20 focus:border-natal-gold outline-none placeholder:text-white/30"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          O que você quer decorar?
        </span>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Ex: fachada da minha loja, praça do condomínio, minha casa…"
          className="h-12 px-4 bg-white/5 text-white text-sm font-medium border border-white/20 focus:border-natal-gold outline-none placeholder:text-white/30"
        />
      </label>

      <button
        type="submit"
        className="min-h-12 mt-2 bg-natal-gold text-black font-bold hover:bg-white transition-colors uppercase tracking-[0.2em] text-xs cursor-pointer"
      >
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}
