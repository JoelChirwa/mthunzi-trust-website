import React from "react";

const MthunziMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-blue mb-6 leading-tight">
            Mthunzi Trust is a registered
            <span className="text-primary-green"> Youth-Led </span>
            Non-Profit Organisation
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            Our work is in line with Sustainable Development Goals, Malawi
            Agenda 2030 and Malawi Vision 2063.
          </p>
          <a
            href="#about"
            className="inline-block bg-primary-green text-white font-semibold px-8 py-4 rounded-xl transition-all hover:bg-lime-600 hover:shadow-lg hover:-translate-y-1 shadow-md"
          >
            About Us <span className="inline-block ml-2">→</span>
          </a>
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={importedImage}
            alt="About Mthunzi Trust"
            className="rounded-3xl shadow-2xl w-full h-auto object-cover max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};
import importedImage from "../../assets/images/about.webp";

export default MthunziMission;
