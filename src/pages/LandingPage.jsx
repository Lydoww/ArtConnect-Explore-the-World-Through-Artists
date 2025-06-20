import { ArrowRight } from "lucide-react";
import Carousel from "../components/layout/Carousel";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between text-center">
      <div>
        <h1 className="text-7xl md:text-7xl font-bold text-gray-300 mb-8  leading-tight">
          Discover the{" "}
          <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
            Masters
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Dive into the world of the greatest artists in history and discover
          their masterpieces
        </p>

        <Link
          to={"/hub"}
          className="inline-flex items-center px-5 py-4 text-lg font-medium text-gray-300 bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 hover:from-fuchsia-800 hover:to-fuchsia-700 rounded-lg transition-all duration-200 group cursor-pointer"
        >
          Explore the Artists
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Carousel  />
      </div>

      
    </div>
  );
};

export default LandingPage;
