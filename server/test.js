// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB44fZ1iXIV2Tcx0KYIHKn2cntaygSOVxc",
  authDomain: "timeapp-7be75.firebaseapp.com",
  projectId: "timeapp-7be75",
  storageBucket: "timeapp-7be75.appspot.com",
  messagingSenderId: "876430677558",
  appId: "1:876430677558:web:930be76a5d5282dbf12a97",
  measurementId: "G-CC7QLDMGBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);