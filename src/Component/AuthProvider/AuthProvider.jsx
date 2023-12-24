import { createUserWithEmailAndPassword,updateProfile , onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import app from '../../AuthInfo';

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const auth= getAuth(app)

    // register email and password
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateProfile = (name, image)=>{
      return updateProfile(auth.currentUser, {
            displayName : name, photoURL: image
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    // google login
    const provider = new GoogleAuthProvider();
    const googleLogin = ()=>{
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        return ()=>{
            unSubscribe()
        }
       })
    },[])


    const authInfo = {
        signUp,
        login,
        user,
        userUpdateProfile,
        loading,
        logOut,
        googleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;