import { Link } from "react-router-dom";
import ArtworkOverlay from "./ArtworkOverlay";
import HeartIcon from "./HeartIcon";
import AddedFeedback from "./AddedFeedback";

const ArtworkCard = ({
  src,
  alt,
  title,
  id,
  isSaved,
  wasJustAdded,
  onAddArtwork,
}) => (
  <Link
    to={`/art/${id}`}
    className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
  >
    <HeartIcon
      isSaved={isSaved}
      onClick={(e) => {
        e.preventDefault(); 
        onAddArtwork({ id, title, image: src, artist: alt });
      }}
    />

    {wasJustAdded && <AddedFeedback />}

    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover"
    />

    <ArtworkOverlay alt={alt} title={title} />
  </Link>
);

export default ArtworkCard;
