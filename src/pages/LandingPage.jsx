import { ArrowRight } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between text-center">
      <div>
        <h1 className="text-7xl md:text-7xl font-bold text-white mb-8 mt-18 leading-tight">
          Discover the{" "}
          <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
            Masters
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          Dive into the world of the greatest artists in history and discover
          their masterpieces
        </p>

        <Link
          to={"/hub"}
          className="inline-flex items-center px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 hover:from-fuchsia-800 hover:to-fuchsia-700 rounded-lg transition-all duration-200 group cursor-pointer"
        >
          Explore the Artists
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Carousel />
      </div>

      <footer className="text-sm text-white mt-12 py-6 border-t border-white/20">
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
            href="https://metmuseum.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-fuchsia-400"
          >
            The Met Museum API
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
