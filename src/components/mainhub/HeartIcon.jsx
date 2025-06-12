import { Heart } from "lucide-react";

const HeartIcon = ({ isSaved, onClick }) => {
  return (
    <button onClick={onClick} className="absolute top-3 right-3 z-10 ">
      <Heart
        className={`w-4 h-4 ${
          isSaved ? "fill-fuchsia-500 text-fuchsia-500" : "text-white"
        }`}
      />
    </button>
  );
};

export default HeartIcon;
