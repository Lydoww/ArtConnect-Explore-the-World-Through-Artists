import { useState } from "react";
import { useParams } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork";
import {
  Calendar,
  User,
  Palette,
  Ruler,
  MapPin,
  Hash,
  Info,
  ArrowLeft,
} from "lucide-react";
import ImageModal from "../components/ui/ImageModal";
import DownloadButton from "../components/ui/DownloadButton";

const Artwork = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useArtwork(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading artwork...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠</div>
          <h2 className="text-2xl font-bold text-red-300 mb-2">
            Error Loading Artwork
          </h2>
          <p className="text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">
            No Artwork Found
          </h2>
          <p className="text-slate-400">
            The requested artwork could not be found.
          </p>
        </div>
      </div>
    );
  }

  const artwork = data.artObject || data;

  return (
    <>
      <div className="min-h-screen mt-12">
        {/* Header */}
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
              <span>Artwork</span>
              <span>•</span>
              <span>{artwork.objectNumber}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {artwork.longTitle || artwork.title}
            </h1>
            {artwork.subTitle && (
              <p className="text-lg text-slate-300 mt-2">{artwork.subTitle}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Section */}
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
                    onClick={() => setIsModalOpen(true)}
                    className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-200 "
                  />
                </div>
                {artwork.webImage && (
                  <div className="p-4 bg-slate-900/70 border-t border-slate-700 flex items-center justify-between">
                    <div className="flex items-center text-sm  text-white">
                      <div className="flex items-center space-x-2">
                        <Ruler className="w-4 h-4 text-white" />
                        <span>
                          {artwork.webImage.width} × {artwork.webImage.height}{" "}
                          px
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

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Artist & Date */}
              <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                  Artist & Date
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-fuchsia-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">
                        {artwork.principalOrFirstMaker ||
                          artwork.principalMaker}
                      </p>
                      {artwork.principalMakers?.[0] && (
                        <p className="text-sm text-slate-300">
                          {artwork.principalMakers[0].dateOfBirth &&
                          artwork.principalMakers[0].dateOfDeath
                            ? `(${artwork.principalMakers[0].dateOfBirth}–${artwork.principalMakers[0].dateOfDeath})`
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  {artwork.dating && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">
                          {artwork.dating.presentingDate}
                        </p>
                        {artwork.dating.period && (
                          <p className="text-sm text-slate-300">
                            {artwork.dating.period}th century
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                  Technical Details
                </h2>
                <div className="space-y-3">
                  {artwork.physicalMedium && (
                    <div className="flex items-start space-x-3">
                      <Palette className="w-5 h-5 text-fuchsia-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Medium</p>
                        <p className="text-sm text-slate-300 capitalize">
                          {artwork.physicalMedium}
                        </p>
                      </div>
                    </div>
                  )}
                  {artwork.dimensions && artwork.dimensions.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Ruler className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Dimensions</p>
                        {artwork.dimensions.map((dim, index) => (
                          <p key={index} className="text-sm text-slate-300">
                            {dim.type}: {dim.value} {dim.unit}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {artwork.materials && artwork.materials.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Hash className="w-5 h-5 text-fuchsia-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Materials</p>
                        <p className="text-sm text-slate-300 capitalize">
                          {artwork.materials.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                  {artwork.location && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Location</p>
                        <p className="text-sm text-slate-300">
                          {artwork.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Acquisition */}
              {artwork.acquisition && (
                <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                  <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                    Acquisition
                  </h2>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300 capitalize">
                      <span className="font-medium text-white">Method:</span>{" "}
                      {artwork.acquisition.method}
                    </p>
                    {artwork.acquisition.date && (
                      <p className="text-sm text-slate-300">
                        <span className="font-medium text-white">Date:</span>{" "}
                        {new Date(artwork.acquisition.date).getFullYear()}
                      </p>
                    )}
                    {artwork.acquisition.creditLine && (
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {artwork.acquisition.creditLine}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          {(artwork.description || artwork.plaqueDescriptionEnglish) && (
            <div className="mt-8">
              <div className="bg-slate-800/50 rounded-xl shadow-lg p-8 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                <div className="flex items-center space-x-2 mb-6">
                  <Info className="w-6 h-6 text-fuchsia-400" />
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                    About This Artwork
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  {artwork.plaqueDescriptionEnglish && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-3">
                        Museum Description
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {artwork.plaqueDescriptionEnglish}
                      </p>
                    </div>
                  )}
                  {artwork.description &&
                    artwork.description !==
                      artwork.plaqueDescriptionEnglish && (
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">
                          Additional Information
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {artwork.description}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          {(artwork.objectTypes ||
            artwork.objectCollection ||
            artwork.historicalPersons) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 ">
              {artwork.objectTypes && artwork.objectTypes.length > 0 && (
                <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                  <h3 className="font-semibold text-white mb-3">Object Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.objectTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm capitalize "
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {artwork.objectCollection &&
                artwork.objectCollection.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                    <h3 className="font-semibold text-white mb-3">
                      Collection
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {artwork.objectCollection.map((collection, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-fuchsia-900/50 to-orange-900/50 text-fuchsia-100 rounded-full text-sm capitalize border border-fuchsia-500/30"
                        >
                          {collection}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {artwork.historicalPersons &&
                artwork.historicalPersons.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300">
                    <h3 className="font-semibold text-white mb-3">
                      Historical Persons
                    </h3>
                    <div className="space-y-1">
                      {artwork.historicalPersons.map((person, index) => (
                        <p key={index} className="text-sm text-slate-300">
                          {person}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
      <ImageModal show={isModalOpen} toggleModal={() => setIsModalOpen(false)}>
        <img
          src={artwork.webImage?.url}
          alt={artwork.title}
          className="rounded-lg"
        />
      </ImageModal>
    </>
  );
};

export default Artwork;
