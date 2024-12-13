
// import { initializeApp } from "firebase/app";
// import { toast } from "react-toastify";
// import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, setDoc,getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyA1HVxXV9if7v3B8-z0rGi42427ymlSZYY",
//     authDomain: "spotmu-591d7.firebaseapp.com",
//     projectId: "spotmu-591d7",
//     storageBucket: "spotmu-591d7.appspot.com",
//     messagingSenderId: "1072116287475",
//     appId: "1:1072116287475:web:81fd57af18c673e5e27486"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const db = getFirestore(app)
// const storage = getStorage()
// const signup = async (username, email, password) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth, email, password)
//         const user = res.user
//         await setDoc(doc(db, 'users', user.uid), {
//             uid: user.uid,
//             username: username.toLowerCase(),
//             email
//         })
//         toast.success('Account Created Succesfully', { theme: 'dark' })
//     } catch (error) {
//         console.log('error', error)
//         toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' })

//     }


// }
// const signin = async (email, password) => {
//     try {
//         const res = await signInWithEmailAndPassword(auth, email, password)
//         toast.success('Account Logged in Sucessfully', { theme: 'dark' })
//     } catch (error) {
//         console.log(error)
//         toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' })

//     }

// }
// const logout = async () => {
//     try {
//         await signOut(auth)
//     } catch (error) {
//         console.log(error)
//         toast.error(error.message, { theme: 'dark' })
//     }

// }
// export {signup ,signin ,logout,auth,db,storage}
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1HVxXV9if7v3B8-z0rGi42427ymlSZYY",
    authDomain: "spotmu-591d7.firebaseapp.com",
    projectId: "spotmu-591d7",
    storageBucket: "spotmu-591d7.appspot.com",
    messagingSenderId: "1072116287475",
    appId: "1:1072116287475:web:81fd57af18c673e5e27486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// Signup function with Firestore user profile save
const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Save user details in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username: username.toLowerCase(), // Saving username in lowercase
            email: user.email, // Storing the email
            profileImage: "", // Optionally add a default profile image if needed
            createdAt: new Date() // Optional: You can also save account creation timestamp
        });

        // Success message
        toast.success('Account Created Successfully', { theme: 'dark' });
    } catch (error) {
        console.log('Error during signup:', error);
        toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' });
    }
};

// Signin function
const signin = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in Successfully', { theme: 'dark' });
    } catch (error) {
        console.log('Error during login:', error);
        toast.error(error.code.split('/')[1].split('-').join(' '), { theme: 'dark' });
    }
};

// Logout function
const logout = async () => {
    try {
        await signOut(auth);
        toast.success('Logged out successfully', { theme: 'dark' });
    } catch (error) {
        console.log('Error during logout:', error);
        toast.error(error.message, { theme: 'dark' });
    }
};

export { signup, signin, logout, auth, db, storage };
