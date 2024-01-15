"use client";
import { ThemeContext } from "@app/app/contexts/theme.context";
import { useEffect, useState } from "react";
import { Provider, connect, useDispatch } from "react-redux";
import { NextButton } from "./app-button";
import { store } from "@app/store/store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const AppFirebase = ( {children} ) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyAtWyP2eIEHwjpFN2MhIJq4ycVll9wRBcQ",
            authDomain: "newcleare-reactor.firebaseapp.com",
            projectId: "newcleare-reactor",
            storageBucket: "newcleare-reactor.appspot.com",
            messagingSenderId: "90276163693",
            appId: "1:90276163693:web:f96635cd8186c4f6dfcf64",
            measurementId: "G-BK7RB2MD9Q"
          };          
        initializeApp(firebaseConfig);
        console.log("firebase initialized");
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // ...
                dispatch.user.setUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email,
                });
            } else {
                dispatch.user.setUser({
                    id: undefined,
                    email: undefined,
                    displayName: undefined,
                });
                // User is signed out
                // ...
            }
        });
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <>
            { children }
        </>
    );
}