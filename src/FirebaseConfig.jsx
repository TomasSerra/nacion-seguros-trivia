import { initializeApp, firebase } from "firebase/app";
import 'firebase/database';

// Configura Firebase con la configuración de tu proyecto
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "trivia-nacion-seguros.firebaseapp.com",
  databaseURL: "https://trivia-nacion-seguros-default-rtdb.firebaseio.com",
  projectId: "trivia-nacion-seguros",
  storageBucket: "trivia-nacion-seguros.appspot.com",
  messagingSenderId: "930718249540",
  appId: "1:930718249540:web:23b237448e2a42e924c211"
};

const app = initializeApp(firebaseConfig);

export default app;