import { createContext, useContext,useState,useEffect, use } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore,addDoc } from "firebase/firestore";
import { collection,getDocs} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { updateProfile } from 'firebase/auth';



const FirebaseContext = createContext();




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const getBookById = async (id) => {
  const docRef = doc(firestore, "books", id);
  return await getDoc(docRef);
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseauth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

// Custom Hook
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider
export const FirebaseProvider = ({ children }) => {

  const [user, setUser] = useState(null);

   useEffect(() => {
    onAuthStateChanged(firebaseauth, (user) => {
      if (user) {
        setUser(user);
        console.log('user is logged')
      } else {
        setUser(null);
        console.log('user is logged out');
      }
    });
   }, [])

   const signUpUserWithEmailAndPassword =  (email, password) => 
   createUserWithEmailAndPassword(firebaseauth, email, password);
   
   const signInUserWithEmailAndPassword =  (email, password) => 
   signInWithEmailAndPassword(firebaseauth, email, password);

   const signInWithGoogle = () => signInWithPopup(firebaseauth, provider);

   const isLoggedIn = user ? true : false;

   const HandleCreateNewListing = async (name,isbnNumber,price,author) => {
   return await addDoc(collection(firestore, "books"), {
      name: name,
      isbnNumber: isbnNumber,
      price: price,
      userId: user.uid,
      userEmail: user.email,
      author: author,
      userDisplayName: user.displayName,
     
    });
     
   }

   const listAllBooks = async () => {
    try {
      const booksSnapshot = await getDocs(collection(firestore, "books"));
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      return booksList;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };
  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    return await getDoc(docRef);
  };
  const logoutUser = async () => {
    try {
      await signOut(firebaseauth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };


const updateUserProfile = async (displayName) => {
  try {
    if (firebaseauth.currentUser) {
      await updateProfile(firebaseauth.currentUser, { displayName });
      console.log("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};


  return (
    <FirebaseContext.Provider value={{signUpUserWithEmailAndPassword,signInUserWithEmailAndPassword,signInWithGoogle,isLoggedIn,HandleCreateNewListing,listAllBooks, getBookById,logoutUser,updateUserProfile}}>
      {children}
    </FirebaseContext.Provider>
  );
};
