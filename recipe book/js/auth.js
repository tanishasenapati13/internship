// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// // Firebase Configuration (Replace with your own credentials)
// const firebaseConfig = {
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // Ensure DOM is loaded before adding event listeners
// document.addEventListener("DOMContentLoaded", () => {
//     const googleLoginBtn = document.getElementById("googleLogin");
//     const signupBtn = document.getElementById("signup");
//     const loginBtn = document.getElementById("login");
//     const logoutBtn = document.getElementById("logout");

//     // Google Login
//     if (googleLoginBtn) {
//         googleLoginBtn.addEventListener("click", async () => {
//             try {
//                 const result = await signInWithPopup(auth, provider);
//                 console.log("Google User:", result.user);
//             } catch (error) {
//                 console.error("Error:", error);
//                 alert("Google Sign-In Failed: " + error.message);
//             }
//         });
//     }

//     // Email Signup
//     if (signupBtn) {
//         signupBtn.addEventListener("click", async () => {
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;
//             try {
//                 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//                 console.log("User Created:", userCredential.user);
//             } catch (error) {
//                 console.error("Signup Error:", error);
//             }
//         });
//     }

//     // Email Login
//     if (loginBtn) {
//         loginBtn.addEventListener("click", async () => {
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;
//             try {
//                 const userCredential = await signInWithEmailAndPassword(auth, email, password);
//                 console.log("User Logged In:", userCredential.user);
//             } catch (error) {
//                 console.error("Login Error:", error);
//             }
//         });
//     }

//     // Logout
//     if (logoutBtn) {
//         logoutBtn.addEventListener("click", async () => {
//             await signOut(auth);
//             console.log("User Logged Out");
//         });
//     }
// });


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Email and Password Login
// document.getElementById('loginForm').addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             console.log(user);

//             // Redirect user to the next page
//             window.location.href = 'intro.html'; // Replace with your desired page
//         })
//         .catch((error) => {
//             // Handle login errors (e.g., wrong password or user not found)
//             console.error("Error: ", error.message);
//         });
// });

// // Google Sign-In function
// document.getElementById('googleLogin').addEventListener('click', () => {
//     const provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider)
//         .then((result) => {
//             const user = result.user;
//             console.log(user);

//             // Redirect user to the next page
//             window.location.href = 'intro.html'; // Replace with your desired page
//         })
//         .catch((error) => {
//             // Handle errors
//             console.error(error.message);
//         });
// });

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase Configuration (Replace with your own credentials)
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Event listener for login form submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const googleLoginBtn = document.getElementById('googleLogin');

    // Email and Password Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User Logged In:", userCredential.user);

            // Redirect user to the next page (intro.html)
            window.location.href = 'intro.html'; // Replace with your desired page
        } catch (error) {
            console.error("Login Error:", error);
            alert("Error logging in: " + error.message);
        }
    });

    // Google Login
    googleLoginBtn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google User:", result.user);

            // Redirect user to the next page (intro.html)
            window.location.href = 'intro.html'; // Replace with your desired page
        } catch (error) {
            console.error("Error with Google Sign-In:", error);
            alert("Google Sign-In Failed: " + error.message);
        }
    });
});

//password reset
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById('forgotPassword').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email to reset the password.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        alert("Error: " + error.message);
    }
});
// const firebaseConfig = {
//     };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();
// function signUp() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     auth.createUserWithEmailAndPassword(email, password)
//         .then(userCredential => alert("User signed up"))
//         .catch(error => alert(error.message));
// }
// function logIn() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     auth.signInWithEmailAndPassword(email, password)
//         .then(userCredential => alert("User logged in"))
//         .catch(error => alert(error.message));
// }
// function googleLogin() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider)
//         .then(result => alert("Google login successful"))
//         .catch(error => alert(error.message));
// }
// function logOut() {
//     auth.signOut().then(() => alert("Logged out"));
// }
