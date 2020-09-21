// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAjNmRMRdMYM-bVlXz_pt1ElkDO1QR-QKA",
  authDomain: "vine-church-f82a0.firebaseapp.com",
  databaseURL: "https://vine-church-f82a0.firebaseio.com",
  projectId: "vine-church-f82a0",
  storageBucket: "vine-church-f82a0.appspot.com",
  messagingSenderId: "335530755567",
  appId: "1:335530755567:web:a34ed41dec1b189691e21a",
  measurementId: "G-7CGPC06F2H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
