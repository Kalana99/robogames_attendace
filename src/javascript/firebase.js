import { initializeApp } from "firebase/app";
// import firebase from "firebase";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
// firebase.firestore().settings({ experimentalForceLongPolling: true });
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // this line
    // useFetchStreams: false, // and this line
  })
// export const db = getFirestore(app);