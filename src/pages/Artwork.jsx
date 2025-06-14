import { useState } from "react";
import { useParams } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork";
import { ArrowLeft } from "lucide-react";
import ImageModal from "../components/ui/ImageModal";
import ArtworkHeader from "../components/artwork/ArtworkHeader";
import ArtworkImage from "../components/artwork/ArtworkImage";
import ArtworkDetails from "../components/artwork/ArtworkDetails";
import ArtworkTech from "../components/artwork/ArtworkTech";
import ArtworkAcquisition from "../components/artwork/ArtworkAcquisition";
import ArtworkDescription from "../components/artwork/ArtworkDescription";
import ArtworkAdditionalnfo from "../components/artwork/ArtworkAdditionalnfo";

const Artwork = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useArtwork(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading artwork...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center">
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

        <ArtworkHeader artwork={artwork} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Section */}
            <ArtworkImage artwork={artwork} />

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Artist & Date */}
              <ArtworkDetails artwork={artwork} />

              {/* Technical Details */}
              <ArtworkTech artwork={artwork} />

              {/* Acquisition */}
              {artwork.acquisition && <ArtworkAcquisition artwork={artwork} />}
            </div>
          </div>

          {/* Description Section */}
          {(artwork.description || artwork.plaqueDescriptionEnglish) && (
            <ArtworkDescription artwork={artwork} />
          )}

          {/* Additional Information */}
          {(artwork.objectTypes ||
            artwork.objectCollection ||
            artwork.historicalPersons) && (
            <ArtworkAdditionalnfo artwork={artwork} />
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
