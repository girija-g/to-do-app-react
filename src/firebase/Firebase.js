import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyABZNZDdWzTOjw0KSVlLH356cr6Y7Q0Dj0",
  authDomain: "to-do-app-b3c50.firebaseapp.com",
  projectId: "to-do-app-b3c50",
  storageBucket: "to-do-app-b3c50.appspot.com",
  messagingSenderId: "435599752369",
  appId: "1:435599752369:web:1a9d3587137d305996b690",
  measurementId: "G-6QQD95M0E2"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default db
