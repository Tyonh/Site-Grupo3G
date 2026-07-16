import Image from "next/image";

interface GalleryItem {
  title: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Campo sobral - Refletor Modular",
    image: "/sobral-campo.png",
  },
  {
    title: "Terra&Mar - Refletor Modular",
    image: "/terramar.JPG",
  },
  {
    title: "Quixeramobim - Refletor Modular",
    image: "/quixeramobim-camp.JPG",
  },
  {
    title: "Caucaia - Refletor Modular",
    image: "/caucaua-campo.png",
  },
  {
    title: "Juazeiro - Solar",
    image: "/Juazeiro.JPG",
  },
  {
    title: "Juazeiro - Homologada",
    image: "/Juazeiro-2.png",
  },
  {
    title: "Beberibe - Homologada",
    image: "/Beberibe.jpeg",
  },
  {
    title: "Sucatinga - Homologada",
    image: "/Sucatinga.jpeg",
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 bg-brand-red text-center w-full overflow-hidden shadow-inner">
      <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-10 uppercase tracking-widest px-5">
        Nossos Projetos Recentes
      </h2>

      {/* Grid Container with Horizontal Scroll & Adaptive Col Widths */}
      <div className="grid grid-rows-[repeat(2,160px)] sm:grid-rows-[repeat(2,220px)] md:grid-rows-[repeat(2,260px)] lg:grid-rows-[repeat(2,280px)] grid-flow-col auto-cols-[82%] sm:auto-cols-[45%] md:auto-cols-[35%] lg:auto-cols-[28%] xl:auto-cols-[23%] gap-4 md:gap-5 px-4 md:px-6 pb-6 overflow-x-auto scroll-snap-x scroll-smooth gallery-scrollbar">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-full overflow-hidden rounded-xl bg-gray-900 flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl scroll-snap-align-center group border border-white/5">
            {/* Elegant overlay gradient for typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-95" />

            {/* Title overlay positioned at bottom-left */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 z-20 flex flex-col text-left transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-white font-extrabold text-xs sm:text-sm md:text-base uppercase tracking-wider line-clamp-2 drop-shadow-md">
                {item.title}
              </span>
            </div>

            {/* Project Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 768px) 45vw, (max-width: 1024px) 35vw, 28vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
