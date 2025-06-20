import { Ruler, ImageOff } from "lucide-react";
import DownloadButton from "../ui/DownloadButton";

const ArtworkImage = ({ artwork, onImageClick }) => {
  const hasImage = artwork.webImage?.url;

  return (
    <div className="lg:col-span-2">
      <div className="bg-slate-800/50 rounded-2xl shadow-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300">
        <div className="bg-slate-900 flex items-center justify-center aspect-[3/4] relative">
          {hasImage ? (
            <img
              src={artwork.webImage.url}
              alt={artwork.title || "Artwork image"}
              onClick={onImageClick}
              className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center w-full h-full">
              <div className="bg-slate-800/50 p-6 rounded-full mb-4">
                <ImageOff
                  className="w-10 h-10 text-slate-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-1">
                No Image Available
              </h3>
              <p className="text-sm text-slate-500 max-w-[200px]">
                This artwork doesn't have a digital representation
              </p>
            </div>
          )}
        </div>

        {hasImage && (
          <div className="p-4 bg-slate-900/70 border-t border-slate-700 flex items-center justify-between">
            <div className="flex items-center text-sm text-white/90">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-white/80" />
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