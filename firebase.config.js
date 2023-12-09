// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcIV7c2NFbVdQeH39bi-FBXL5-iYqCxt0",
  authDomain: "qualitysolutions-9f31e.firebaseapp.com",
  projectId: "qualitysolutions-9f31e",
  storageBucket: "qualitysolutions-9f31e.appspot.com",
  messagingSenderId: "312425207369",
  appId: "1:312425207369:web:bd73a340527f503a7c1198",
  measurementId: "G-72MMKW3R1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
