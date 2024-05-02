import firebase from  'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDbfh61RJ6bwVefYK6NxxKoHzTV5NonX34",
    authDomain: "curso-react-b3f69.firebaseapp.com",
    projectId: "curso-react-b3f69",
    storageBucket: "curso-react-b3f69.appspot.com",
    messagingSenderId: "1064580791879",
    appId: "1:1064580791879:web:038fea12e21a0353b2bb62"
};

firebase.initializeApp(firebaseConfig)
//firebase.auth = firebase.auth()

export default firebase