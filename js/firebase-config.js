// Firebase Configuration
// Replace with your Firebase project credentials
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDG7yn5OHxHg9_H8hujTWyNL7Gecn7JlpM",
    authDomain: "se-201-semester-project.firebaseapp.com",
    projectId: "se-201-semester-project",
    storageBucket: "se-201-semester-project.firebasestorage.app",
    messagingSenderId: "464784564738",
    appId: "1:464784564738:web:e88d64126a701b9ca6bd1b",
    measurementId: "G-MMR56YZM35"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

