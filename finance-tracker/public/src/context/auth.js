// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCV-BhFROBtMJq9C7Ugw7DwSyePXcIpySE",
    authDomain: "recipe-tracker-634d1.firebaseapp.com",
    projectId: "recipe-tracker-634d1",
    storageBucket: "recipe-tracker-634d1.firebasestorage.app",
    messagingSenderId: "363210588745",
    appId: "1:363210588745:web:71cc74a975eaf14ca47598"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const googleLoginBtn = document.getElementById('googleLogin');
    const forgotPasswordBtn = document.getElementById('forgotPassword');

    // Email and Password Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User Logged In:", userCredential.user);
                window.location.href = "main.html"; // ✅ Redirect to main page
            } catch (error) {
                alert("Error logging in: " + error.message);
            }
        });
    }

    // Google Login
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                console.log("Google User:", result.user);
                window.location.href = "main.html"; // ✅ Redirect to main page
            } catch (error) {
                alert("Google Sign-In Failed: " + error.message);
            }
        });
    }

    // Password Reset
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            if (!email) {
                alert("Please enter your email.");
                return;
            }
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset email sent!");
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }
});
