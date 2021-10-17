import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";
import { firebaseConfig } from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;
