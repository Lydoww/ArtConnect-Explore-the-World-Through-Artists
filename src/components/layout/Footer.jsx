const Footer = () => {
  return (
    <footer className="text-sm text-white mt-12 py-6 border-t border-white/20 flex flex-col justify-between text-center">
      <p className="mb-2">
        © {new Date().getFullYear()} ArtConnect. All rights reserved.
      </p>
      <p className="opacity-70">
        Built by{" "}
        <a
          href="https://alexis-helm.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fuchsia-400"
        >
          Alexis Helm
        </a>
        . Data from{" "}
        <a
          href="https://www.rijksmuseum.nl/en"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fuchsia-400"
        >
          The Rijksmuseum API
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
