// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDrAH_b35Zq9B-8uYMViKmoWOgNnqx3N5w",
  authDomain: "jas-music-3b7c5.firebaseapp.com",
  projectId: "jas-music-3b7c5",
  storageBucket: "jas-music-3b7c5.appspot.com",
  messagingSenderId: "671398047297",
  appId: "1:671398047297:web:039fac0617633f551ba0c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app,'gs://jas-music-3b7c5.appspot.com/')
export default storage