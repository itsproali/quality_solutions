// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcXFGSXSDFX1Cq0JrG53J4MJ0umd5nCPI",
  authDomain: "quality-solutions-d1108.firebaseapp.com",
  projectId: "quality-solutions-d1108",
  storageBucket: "quality-solutions-d1108.appspot.com",
  messagingSenderId: "286502212341",
  appId: "1:286502212341:web:4fb5eb27d370a287176bbc",
  measurementId: "G-ZXE0F91KM0"
};

// Initialize Firebase
export const initializeFirebaseApp = () => {
  initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);