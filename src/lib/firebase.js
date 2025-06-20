import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_API_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_API_FIREBASE_projectId,
  appId: import.meta.env.VITE_API_FIREBASE_appId,
});

const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");
export { auth };
