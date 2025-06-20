import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

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
      if (!email) {
        console.log("Il n'y a pas d'email");
        return;
      }
      if (!password) {
        console.log("Il n'y a pas de password");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential);
      return userCredential;
    } catch (error) {
      console.log("Error connexion:", error);
      alert("Impossible de se connecter");
    }
  };

  const signup = async ({ email, password }) => {
    try {
      if (!email) {
        console.log("Il n'y a pas d'email");
        return;
      }
      if (!password) {
        console.log("Il n'y a pas de password");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      return userCredential;
    } catch (error) {
      console.log("Error d'inscription:", error.message);
      alert("Impossible de se connecter");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
