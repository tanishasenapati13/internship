import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCV-BhFROBtMJq9C7Ugw7DwSyePXcIpySE",
    authDomain: "recipe-tracker-634d1.firebaseapp.com",
    projectId: "recipe-tracker-634d1",
    storageBucket: "recipe-tracker-634d1.firebasestorage.app",
    messagingSenderId: "363210588745",
    appId: "1:363210588745:web:71cc74a975eaf14ca47598"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  
  // Function to Sign Out
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };