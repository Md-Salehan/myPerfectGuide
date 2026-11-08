// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrLfyCld51Kl1dj5unJ4VAkTw057vNoQc",
  authDomain: "myperfectguide-316eb.firebaseapp.com",
  projectId: "myperfectguide-316eb",
  storageBucket: "myperfectguide-316eb.firebasestorage.app",
  messagingSenderId: "663593497268",
  appId: "1:663593497268:web:691e842c7e73f5c0471de1",
  measurementId: "G-HM4P8KDL72"
};

// Initialize Firebase
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);


let _auth: Auth | null = null;
export function getFirebaseAuthClient(): Auth {
  if (!_auth) _auth = getAuth(firebaseApp);
  _auth.useDeviceLanguage();
  return _auth;
}

