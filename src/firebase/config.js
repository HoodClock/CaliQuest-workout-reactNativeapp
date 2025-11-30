import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyBbLTTk6FATQvoTHnUrsJpnKtKmrgLy8sY",
    authDomain: "madproject-c67f8.firebaseapp.com",
    databaseURL: "https://madproject-c67f8-default-rtdb.firebaseio.com",
    projectId: "madproject-c67f8",
    storageBucket: "madproject-c67f8.appspot.com",
    messagingSenderId: "1044637494518",
    appId: "1:1044637494518:web:99de16a0b341ece70990d7",
    measurementId: "G-GPG9PXC6BN"
};


const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);