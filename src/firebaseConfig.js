import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC92TH0qiu7aHwxBsHNONoeC-9YARpzVwc",
  authDomain: "e-commerce-007.firebaseapp.com",
  projectId: "e-commerce-007",
  storageBucket: "e-commerce-007.firebasestorage.app",
  messagingSenderId: "948314043082",
  appId: "1:948314043082:web:e8f833515fc8ce99ffba33",
  measurementId: "G-ELQZL4EH5P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

