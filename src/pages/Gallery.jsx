import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("artwork"));
    if (Array.isArray(data)) {
      setStoredData(data);
    }
  }, []);

  const handleDelete = (idToRemove) => {
    const storedData = localStorage.getItem("artwork");
    const parsingData = JSON.parse(storedData) || [];
    const filteredData = parsingData.filter((item) => item.id !== idToRemove);
    localStorage.setItem("artwork", JSON.stringify(filteredData));
    setStoredData(filteredData);
  };

  return (
    <div className="flex justify-center text-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            Your Gallery
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Here are the artworks you saved
        </p>

        {storedData.length === 0 && (
          <p className="text-gray-500 mt-12">
            You haven't saved any artworks yet.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {storedData.map(({ id, title, image, artist }) => (
            <Link
              to={`/art/${id}`}
              key={id}
              className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
            >
              <div className="absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <CircleX
                  className="w-5 h-5 text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(id);
                  }}
                />
              </div>
              <img
                src={image}
                alt={artist || title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3 className="text-lg font-bold">
                  {artist || "Unknown artist"}
                </h3>
                <p className="text-sm text-gray-200">{title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
