import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyABNo1F6nBPHIcZkvsox69q0DVGi2-Ln-o",
    authDomain: "reactjs-socialnetwork-25766.firebaseapp.com",
    projectId: "reactjs-socialnetwork-25766",
    storageBucket: "reactjs-socialnetwork-25766.appspot.com",
    messagingSenderId: "852765067936",
    appId: "1:852765067936:web:664976c9388b9125cf97c5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const database = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();


  export { database,auth,storage,provider };