import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  image: string;
  href: string;
}

const products: Product[] = [
  {
    name: "Módulo",
    image: "/modular-estrutura.png",
    href: "/produtos/modulo",
  },
  {
    name: "Luminária Solar",
    image: "/solar-estrutura.png",
    href: "/produtos/luminaria-solar",
  },
  {
    name: "Luminária Homologada",
    image: "/homo-estrutura.png",
    href: "/produtos/luminaria-homologada",
  },
  {
    name: "Luminária EBRON",
    image: "/EBRON-FIEC.png",
    href: "/produtos/ebron",
  },
];

export default function ProductsSection() {
  return (
    <section className="py-16 px-5 max-w-7xl mx-auto text-center">
      <h2 className="text-brand-red text-3xl md:text-4xl font-extrabold mb-12 uppercase tracking-wider">
        Nossos Produtos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center w-full">
        {products.map((product) => {
          const isInternal = product.href.startsWith("/");

          return (
            <Link
              key={product.name}
              href={product.href}
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              className="group flex flex-col items-center justify-between gap-6 w-full max-w-[300px] sm:max-w-none p-6 bg-white rounded-2xl border border-gray-100/80 shadow-premium-glow hover:border-brand-red/30 cursor-pointer">
              <div className="relative w-full h-[180px] flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 300px"
                  className="object-contain group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <button className="w-full bg-brand-dark text-white font-bold py-3 px-4 rounded-lg group-hover:bg-brand-red transition-all duration-300 text-sm tracking-wider uppercase shadow-sm group-hover:shadow-md cursor-pointer transform group-hover:scale-[1.02] active:scale-[0.98]">
                {product.name}
              </button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
