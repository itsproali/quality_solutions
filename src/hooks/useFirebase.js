import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { initializeFirebaseApp } from "../firebase-config";

initializeFirebaseApp();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(null);

  const auth = getAuth();

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then(async (result) => {
      setUser(result.user);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin?email=${result.user.email}`, {
        method: 'POST',
        headers: { 
          "content-type": "application/json",
        }
      });
      if(response.ok) {
        const res =  await response.json();
        setAdmin(res);
      }
    });
  };

  //  observer
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUser(user);
      } else {
        setUser({});
      }
    });

    return () => unsubscribed;
  }, []);

  const logOut = () => {
    signOut(auth).then(() => {});
  };

  return {
    user,
    googleSignIn,
    logOut,
    admin
  };
};

export default useFirebase;
