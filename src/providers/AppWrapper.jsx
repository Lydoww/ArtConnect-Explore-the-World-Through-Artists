import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useArtworkStore } from "../stores/useArtworkStore";

function AppWrapper({ children }) {
  const { user } = useAuth();
  const fetchUserLikes = useArtworkStore((state) => state.fetchUserLikes);
  const clearArtwork = useArtworkStore((state) => state.clearArtwork);

  useEffect(() => {
    if (user?.uid) {
      fetchUserLikes(user.uid);
    }
  }, [user, fetchUserLikes]);

  useEffect(() => {
    if (!user) {
      clearArtwork();
    }
  }, [user, clearArtwork]);

  return <>{children}</>;
}

export default AppWrapper;
