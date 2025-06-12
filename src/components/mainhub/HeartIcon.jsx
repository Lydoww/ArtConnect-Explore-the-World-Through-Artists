import { Heart } from "lucide-react";

const HeartIcon = ({ isSaved, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
    >
      <Heart
        className={`w-5 h-5 ${
          isSaved ? "fill-fuchsia-500 text-fuchsia-500" : "text-white"
        }`}
      />
    </button>
  );
};

export default HeartIcon;
