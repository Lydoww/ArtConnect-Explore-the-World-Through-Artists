import { Search } from "lucide-react";

const SearchBar = ({ searchInput, handleInputChange }) => (
  <div className="relative w-[340px] h-12">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search artists, themes or keywords..."
      className="w-full h-full text-gray-400 pl-10 pr-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
      value={searchInput}
      onChange={handleInputChange}
    />
  </div>
);

export default SearchBar