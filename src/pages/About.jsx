import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white/5 text-white rounded-2xl shadow-lg space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl">
          <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
            About this project
          </span>
        </h1>
        <p className="text-slate-300 text-lg">
          Discover the vision behind this site, its data source, and future
          improvements.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          What is this site?
        </h2>
        <p className="text-slate-300 leading-relaxed">
          This website is a curated digital art gallery built with React and
          powered by the{" "}
          <a
            href="https://www.rijksmuseum.nl/en/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 underline hover:text-amber-300 transition"
          >
            Rijksmuseum API
          </a>
          . It offers a selection of artworks, primarily from Dutch collections,
          with a clean, modern interface.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Known Limitations</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2 pl-4">
          <li>
            <span className="font-medium text-white">Dutch Focus:</span> Most
            artworks and artists are from the Netherlands, limiting
            international diversity.
          </li>
          <li>
            <span className="font-medium text-white">
              Partial English Translations:
            </span>{" "}
            Some artwork descriptions are only available in Dutch.
          </li>
          <li>
            <span className="font-medium text-white">Sparse Metadata:</span>{" "}
            Certain fields like techniques or styles may be incomplete or
            missing.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          What We're Working On
        </h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2 pl-4">
          <li>Improving English translations for better accessibility.</li>
          <li>Integrating more open art APIs to diversify the collection.</li>
          <li>Enhancing search, filtering, and user preferences features.</li>
        </ul>
      </section>

      <section>
        <p className="text-slate-300">
          This is an evolving project — we’re continuously improving the user
          experience. Feel free to explore, save your favorites, and follow the
          journey as we expand beyond the Rijksmuseum.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
