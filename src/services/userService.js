import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const createUserProfile = async ({ uid, email }) => {
  if (!uid || !email) {
    throw new Error("Missing UID or email when creating profile");
  }

  const userRef = doc(db, "users", uid);

  const userData = {
    email,
    createdAt: new Date(),
  };

  await setDoc(userRef, userData, { merge: true });
};
