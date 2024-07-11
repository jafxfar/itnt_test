import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDl4ar41yEmR7ring6C-irndABFWvYCS74",
    authDomain: "itnt-1d355.firebaseapp.com",
    projectId: "itnt-1d355",
    storageBucket: "itnt-1d355.appspot.com",
    messagingSenderId: "60310399783",
    appId: "1:60310399783:web:035b6c597328bdfedcd702",
    measurementId: "G-WPBPDV04ZE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
