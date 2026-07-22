import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- Line 3 Fixed!

const firebaseConfig = {
  apiKey: "AIzaSyAQMvR9xh1G496_LpZroMUxapcgD2QY9Dk",
  authDomain: "drive-a85dc.firebaseapp.com",
  projectId: "drive-a85dc",
  storageBucket: "drive-a85dc.firebasestorage.app",
  messagingSenderId: "144602397651",
  appId: "1:144602397651:web:adc0a6562c3753a60e0d26",
  measurementId: "G-RJ02D20R01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and export it so your other files can use it!
export const auth = getAuth(app);