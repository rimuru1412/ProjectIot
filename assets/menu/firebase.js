import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDX5za4r5h8LfRLCHNlzHJqYXWRMJx_wTs",
    authDomain: "mistingrh.firebaseapp.com",
    databaseURL: "https://mistingrh-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mistingrh",
    storageBucket: "mistingrh.appspot.com",
    messagingSenderId: "493789573429",
    appId: "1:493789573429:android:c6eada029bd42772245c7c",
};
// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
const db = app.database();
// const auth = getAuth(app);
// const auth = getAuth();

export { auth, db };