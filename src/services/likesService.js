import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const createLikes = async (user, artwork) => {
  const now = Date.now();

  if (!user) {
    console.error("createLikes: Missing user");
    return null;
  }
  if (!artwork?.id) {
    throw new Error("createLikes: Artwork id is missing");
  }

  console.log("createLikes: Creating like for artwork id:", artwork.id);

  const likeRef = doc(db, "likes", `${user.uid}_${artwork.id}`);

  const inferredStyle =
    artwork.styles?.join(", ") ||
    artwork.techniques?.join(", ") ||
    artwork.period ||
    artwork.culture ||
    "Unknown";

  const likeData = {
    id: artwork.id,
    artworkTitle: artwork.title || artwork.artworkTitle || "Untitled",
    artist: artwork.artist || artwork.name || "Unknown Artist",
    image: artwork.image || null,
    style: inferredStyle,
    user: user.uid,
    likedAt: now,
    savedAt: now,
  };

  await setDoc(likeRef, likeData, { merge: true });
  console.log("createLikes: Like created", likeData);
  return likeData;
};
