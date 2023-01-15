import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZainFTyc8bVlvqkXB5_8VwuiKnUoVCVI",
  authDomain: "fileuploading-a71b2.firebaseapp.com",
  projectId: "fileuploading-a71b2",
  storageBucket: "fileuploading-a71b2.appspot.com",
  messagingSenderId: "385114611755",
  appId: "1:385114611755:web:ab2b0ce90a57b83bce4a6e",
  measurementId: "G-NZHW67XKVX"
};

// Firebase storage reference
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
