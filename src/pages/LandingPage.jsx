import { ArrowRight } from "lucide-react";
import Carousel from "@/components/ui/Carousel";

const LandingPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-7xl md:text-7xl font-bold text-white mb-6 leading-tight">
        Discover the{" "}
        <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
          Masters
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
        Dive into the world of the greatest artists in history and discover
        their masterpieces
      </p>

      <button className="inline-flex items-center px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 hover:from-fuchsia-800 hover:to-fuchsia-700 rounded-lg transition-all duration-200 group cursor-pointer">
        Explore the Artists
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <Carousel />
    </div>
  );
};

export default LandingPage;
