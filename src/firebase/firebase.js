import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	

  apiKey: "AIzaSyCgqMYqecefHKxRsMYf2I1mWHgmMTmdKqk",
  authDomain: "app-bf4b8.firebaseapp.com",
  databaseURL: "https://app-bf4b8-default-rtdb.firebaseio.com",
  projectId: "app-bf4b8",
  storageBucket: "app-bf4b8.appspot.com",
  messagingSenderId: "893936410510",
  appId: "1:893936410510:web:68904fc62abec937554edf"
	
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
