import { Ruler } from "lucide-react";
import DownloadButton from "../ui/DownloadButton";

const ArtworkImage = ({ artwork, onImageClick }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-slate-800/50 rounded-2xl shadow-lg overflow-hidden border border-slate-700">
        <div className=" bg-slate-900 flex items-center justify-center">
          <img
            src={
              artwork.webImage?.url ||
              "https://via.placeholder.com/800x1000?text=No+Image" ||
              "/placeholder.svg"
            }
            alt={artwork.title}
            onClick={onImageClick}
            className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-200 "
          />
        </div>
        {artwork.webImage && (
          <div className="p-4 bg-slate-900/70 border-t border-slate-700 flex items-center justify-between">
            <div className="flex items-center text-sm  text-white">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-white" />
                <span>
                  {artwork.webImage.width} × {artwork.webImage.height} px
                </span>
              </div>
            </div>
            <DownloadButton
              imageUrl={artwork.webImage.url}
              fileName={`${artwork.title || "artwork"}.jpg`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkImage;
