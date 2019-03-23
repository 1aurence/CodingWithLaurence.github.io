import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyAvel5Uw5a25gLZkGubNYrwg6Xtb-LXFT4",
  authDomain: "newscenter-b7363.firebaseapp.com",
  databaseURL: "https://newscenter-b7363.firebaseio.com",
  projectId: "newscenter-b7363",
  storageBucket: "newscenter-b7363.appspot.com",
  messagingSenderId: "935305787125"
})
export const db = firebaseapp.firestore()