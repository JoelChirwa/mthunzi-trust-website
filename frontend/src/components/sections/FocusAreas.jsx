const FocusAreas = () => {
  const areas = [
    {
      number: "01",
      title: "Quality Education",
      description:
        "Our education programmes are aimed at promoting 100 percent access of children to primary and secondary education",
    },
    {
      number: "02",
      title: "Adolescent Sexual & Reproductive Health Right",
      description:
        "This programme was built to provide appropriate education and Supporting right-based Advocacy activities",
    },
    {
      number: "03",
      title: "Entrepreneurial & Employable Skills",
      description:
        "This programme is aimed at providing step-up opportunities for young people to build up working experience and entrepreneurial skills",
    },
    {
      number: "04",
      title: "Climate Justice & Environment Conservation",
      description:
        "Tree planting, forest restoration, waste management, and engaging youth and local communities in climate advocacy.",
    },
    {
      number: "05",
      title: "Agriculture",
      description:
        "Focused on improving the farmer’s economic situation through sustainable agri-business and market system development.",
    },
    {
      number: "06",
      title: "Water & Sanitation",
      description:
        "Improving community health by providing access to clean water and promoting sustainable sanitation practices.",
    },
  ];

  return (
    <section
      className="py-24 bg-[#155799] relative"
      style={{ clipPath: "polygon(0 5vw, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row md:items-start md:gap-16">
          <div className="md:w-1/3 mb-10 md:mb-0">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
            >
              Our Programmes
            </h2>
            <p className="text-white font-medium">
              We are organising our activities in 6 main programme areas that
              are strongly interconnected.
            </p>
          </div>
          <div className="md:w-2/3 grid md:grid-cols-2 gap-10">
            {areas.map((area, idx) => (
              <div key={area.number} className="relative">
                <span className="absolute left-0 top-0 text-[64px] md:text-[80px] font-bold text-white/10 select-none z-0">
                  {area.number}
                </span>
                <div className="relative z-10">
                  <h3
                    className="text-2xl md:text-3xl font-extrabold text-lime-300 mb-2 drop-shadow-lg"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-white text-sm md:text-base font-normal leading-relaxed whitespace-pre-line">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button className="bg-primary-green text-white font-semibold px-8 py-3 rounded shadow hover:bg-lime-500 transition-all text-base flex items-center gap-2">
            Our Programmes
            <span className="inline-block">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
