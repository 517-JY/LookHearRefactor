import "firebase/auth";
import firebase from "firebase/app";
// import * as firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDJMKKx3fYyCgx4wZbEWyYM7HHFdVKLGMc",
  authDomain: "lookhearrefactor.firebaseapp.com",
  projectId: "lookhearrefactor",
  storageBucket: "lookhearrefactor.appspot.com",
  messagingSenderId: "312899982729",
  appId: "1:312899982729:web:93fae96bb512454b103d58",
  measurementId: "G-R1CNZWBZBK",
};

// Check if any apps are initialized
if (!firebase.apps.length) {
  // If not
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// const analytics = getAnalytics(app);
export { firebase };
