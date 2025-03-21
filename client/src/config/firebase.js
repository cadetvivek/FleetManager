import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw20iY8FmGZyGwU9MiidFp9VHP1pAdw7M",
  authDomain: "fleet-d1806.firebaseapp.com",
  projectId: "fleet-d1806",
  storageBucket: "fleet-d1806.appspot.com", // ✅ Corrected
  messagingSenderId: "506590662935",
  appId: "1:506590662935:web:ad9a89b7ae675bc0472752"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
