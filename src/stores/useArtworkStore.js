import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";
import { createLikes } from "../services/likesService";
import toast from "react-hot-toast";

export const useArtworkStore = create(
  (set, get) => ({
    savedArtwork: [],
    isLoadingLikes: false,

    async fetchUserLikes(userId) {
      if (!userId) return;
      console.log("[fetchUserLikes] Start fetching likes for userId:", userId);
      set({ isLoadingLikes: true });
      try {
        const q = query(collection(db, "likes"), where("user", "==", userId));
        const querySnapshot = await getDocs(q);
        const likes = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const likedAtMillis =
            data.likedAt && data.likedAt.toMillis
              ? data.likedAt.toMillis()
              : data.likedAt;
          if (data.id && data.artworkTitle) {
            likes.push({
              ...data,
              likedAt: likedAtMillis,
              savedAt: data.savedAt ?? likedAtMillis ?? Date.now(),
            });
          }
        });
        console.log("[fetchUserLikes] Likes fetched:", likes.length);
        set({ savedArtwork: likes, isLoadingLikes: false });
      } catch (error) {
        console.error("fetchUserLikes error:", error);
        set({ savedArtwork: [], isLoadingLikes: false });
      }
    },

    addArtwork: async (user, artwork) => {
      if (!user) {
        toast.error("User not logged in");
        console.error("addArtwork: Missing user");
        return;
      }
      if (!artwork?.id) {
        toast.error("Artwork data invalid");
        console.error("addArtwork: Missing artwork id", artwork);
        return;
      }

      const stored = get().savedArtwork;
      const exists = stored.some((item) => item.id === artwork.id);

      if (exists) {
        console.log("addArtwork: Artwork already liked", artwork.id);
        return;
      }

      try {
        console.log("addArtwork: Adding artwork", artwork);

        const enrichedArtwork = await createLikes(user, artwork);
        console.log(
          "addArtwork: Enriched artwork from createLikes",
          enrichedArtwork
        );

        if (!enrichedArtwork || !enrichedArtwork.id) {
          throw new Error("addArtwork: Invalid enriched artwork returned");
        }

        const artworkWithExtras = {
          ...enrichedArtwork,
          savedAt: Date.now(),
        };

        const updated = [artworkWithExtras, ...stored];
        set({ savedArtwork: updated });
        toast.success("Artwork liked!");
      } catch (error) {
        console.error("addArtwork: Error while adding to firestore:", error);
        toast.error("Failed to like the artwork");
      }
    },

    removeArtwork: async (user, artworkId) => {
      if (!user) {
        toast.error("User not logged in");
        console.error("removeArtwork: Missing user");
        return;
      }
      if (!artworkId) {
        toast.error("Artwork ID invalid");
        console.error("removeArtwork: Missing artworkId");
        return;
      }

      try {
        console.log("removeArtwork: Removing artwork id:", artworkId);
        const updated = get().savedArtwork.filter(
          (item) => item.id !== artworkId
        );
        await deleteDoc(doc(db, "likes", `${user.uid}_${artworkId}`));
        set({ savedArtwork: updated });
        toast.success("Artwork removed");
      } catch (error) {
        console.error(
          "removeArtwork: Error while deleting artwork in firestore:",
          error
        );
        toast.error("Failed to delete the artwork from your collection");
      }
    },

    clearArtwork: () => set({ savedArtwork: [] }),
  }),
  {
    name: "artwork-storage",
  }
);
