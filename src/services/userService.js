import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const createUserProfile = async ({ uid, email }) => {
  if (!uid || !email) {
    throw new Error("Missing UID or email when creating profile");
  }

  const userRef = doc(db, "users", uid);

  const userData = {
    email,
    createdAt: new Date(),
    avatar: null,
  };

  await setDoc(userRef, userData, { merge: true });
};

export const updateUserAvatar = async ({ uid, avatar }) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { avatar });
};

export const getUserProfile = async (uid) => {
  if (!uid) return null;

  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;
  return snap.data();
};
