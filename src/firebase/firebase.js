//Import necessary Firebase modules
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//Firebase configuration using environment variables

//you change here
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore services
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();

export default firebaseApp;
