import {
createUserWithEmailAndPassword,
GoogleAuthProvider,
onAuthStateChanged,
signInWithEmailAndPassword,
signInWithPopup,
signOut,
updateProfile
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import auth from '../firebase/firebase.config.js';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        })
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
      }
    const logOut = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
             if(currentUser?.email){
                axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`,{ email: currentUser.email },{
                    withCredentials: true,
                })
                .then((res) =>{
                    setLoading(false);
                })
             }
             else{
                axios.post(`${import.meta.env.VITE_BASE_URL}/logout`,{},{
                    withCredentials: true,
                })
                .then(() =>{
                    setLoading(false);
                })
             }
            
        });
        return () => unsubscribe();
    }, []);
    const authInfo = {
        googleSignIn,
        user,
        setUser,
        logOut,
        loading,
        signIn,
        createUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;