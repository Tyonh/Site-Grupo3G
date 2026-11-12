/**
 * Injeta um bloco JSON-LD. O `<` é escapado para que nenhum texto do catálogo
 * consiga fechar a tag <script> e injetar HTML.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
