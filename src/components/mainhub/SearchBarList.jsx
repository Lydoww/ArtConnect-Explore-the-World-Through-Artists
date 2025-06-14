import { useState } from "react";
import SearchBar from "./SearchBar";

const artists = [
  "Vermeer",
  "Hendrik Voogd",
  "Van Gogh",
  "Rembrandt",
  "Frans Hals",
  "Gerard de Lairesse",
];

export default function SearchableList() {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredArtists = artists.filter((artist) =>
    artist.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <SearchBar
        searchInput={searchInput}
        handleInputChange={handleInputChange}
      />
      <ul>
        {filteredArtists.map((artist) => (
          <li key={artist}>{artist}</li>
        ))}
      </ul>
    </div>
  );
}
