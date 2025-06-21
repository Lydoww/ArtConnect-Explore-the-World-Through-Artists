import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { createUserProfile } from "../services/userService";
import { useArtwork } from "../hooks/useArtwork";
import { useArtworkStore } from "../stores/useArtworkStore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Successfully logged in !");
      return userCredential;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
    }
  };

  const signup = async ({ email, password }) => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await createUserProfile({
        uid: user.uid,
        email: user.email ?? "unknown",
      });
      toast.success("Account created successfully!");
      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(getFirebaseErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      useArtworkStore.getState().clearArtwork();
      toast.success("Logout success");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className=" w-12 h-12
    rounded-full
    border-4 border-fuchsia-500
    border-t-transparent
    animate-spin
    "
          ></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
