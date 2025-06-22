import { Link } from "react-router-dom";
import ArtworkOverlay from "./ArtworkOverlay";
import HeartIcon from "./HeartIcon";

const ArtworkCard = ({
  src,
  alt,
  title,
  id,
  isSaved,
  wasJustAdded,
  onToggleArtwork,
}) => (
  <Link
    to={`/art/${id}`}
    className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] cursor-pointer group"
  >
    <HeartIcon
      isSaved={isSaved}
      onClick={(e) => {
        e.preventDefault();
        onToggleArtwork({ id, title, image: src, artist: alt });
      }}
    />

    {wasJustAdded}

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
