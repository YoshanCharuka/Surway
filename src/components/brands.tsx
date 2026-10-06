const secondRowLogos = [
  {
    src: "/images/brands/nwsdb-nara-susl.png",
    alt: "National Water Supply and Drainage Board, NARA, and Sabaragamuwa University of Sri Lanka",
    span: "col-span-3",
  },
  {
    src: "/images/brands/colombo-municipal.png",
    alt: "Municipal Council of Colombo",
    span: "col-span-1",
  },
  {
    src: "/images/brands/uda.png",
    alt: "Urban Development Authority of Sri Lanka",
    span: "col-span-1",
  },
  {
    src: "/images/brands/mahaweli.png",
    alt: "Mahaweli Authority of Sri Lanka",
    span: "col-span-1",
  },
];

export default function Brands() {
  return (
    <section id="brands-section" className="bg-[#FBFBFB] py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">Our Brands</h2>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-500">
          Trusted by leading institutions across Sri Lanka
        </p>

        <div className="mt-10 space-y-5 md:mt-16 md:space-y-6">
          <div className="flex items-center justify-center rounded-2xl bg-white px-3 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:px-8 sm:py-6">
            <img
              src="/images/brands/institutions-row.png"
              alt="Ceylon Electricity Board, NAITA, Open University of Sri Lanka, University of Moratuwa, Department of Irrigation, and National Water Supply and Drainage Board"
              className="mx-auto h-auto w-full max-h-28 object-contain sm:max-h-40"
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-1 rounded-2xl bg-white px-2 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:gap-3 sm:px-6 sm:py-6">
            {secondRowLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.span} mx-auto h-auto max-h-24 w-full object-contain sm:max-h-36`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
