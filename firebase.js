import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxJXlWhcTz5S7TmkPdQ5Mf79CcctTcw7w",
  authDomain: "bd-rivian-sivar.firebaseapp.com",
  projectId: "bd-rivian-sivar",
  storageBucket: "bd-rivian-sivar.appspot.com",
  messagingSenderId: "699493301484",
  appId: "1:699493301484:web:b67bb19ee8a09f750939c9"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };