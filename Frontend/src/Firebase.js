// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy3kaDcv5hCC_Pzd0FGTB2JquKhe3fz-w",
  authDomain: "asunspot-71a37.firebaseapp.com",
  projectId: "asunspot-71a37",
  storageBucket: "asunspot-71a37.appspot.com",
  messagingSenderId: "307366684025",
  appId: "1:307366684025:web:c663e7ffdc691aff54fba8",
  measurementId: "G-QMT7QJVZ2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);