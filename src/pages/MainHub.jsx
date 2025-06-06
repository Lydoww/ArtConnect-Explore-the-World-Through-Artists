import { useState } from "react";
import { Search, ListFilter } from "lucide-react";

const MainHub = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchInput("");
  };

  return (
    <div className="flex justify-center text-center">
      <div className="mt-18">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            Artistic Masters
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Explore the most influential artists throughout history and their
          revolutionary contributions to the world of art
        </p>
        <div className="flex items-center gap-6">
          <div className="relative w-full ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search artists..."
              className="w-full text-gray-400 pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="border-2 border-transparent bg-gray-800 py-2 px-3 rounded-lg hover:bg-gray-900 hover:border-fuchsia-500 transition-colors">
            <ListFilter className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHub;
