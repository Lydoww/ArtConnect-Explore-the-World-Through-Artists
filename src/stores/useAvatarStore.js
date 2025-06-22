import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserAvatar } from "../services/userService";

export const useAvatarStore = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (user?.uid) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile?.avatar) setAvatar(profile.avatar);
        } catch (error) {
          console.error("Error loading avatar:", error);
        }
      }
      setIsLoading(false);
    };
    load();
  }, [user]);

  const changeAvatar = async (newAvatar) => {
    if (!user?.uid) return;
    setAvatar(newAvatar);
    await updateUserAvatar({ uid: user.uid, avatar: newAvatar });
  };
  return { avatar, changeAvatar, isLoading };
};
