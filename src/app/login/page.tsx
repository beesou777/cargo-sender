"use client";
import React, { useEffect, useState } from "react";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";

const getFirebaseClientApp = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAsgkkH4SiXMy00PoE0jqLCJh_3A5rgqXc",
    authDomain: "cargosender-8005b.firebaseapp.com",
    projectId: "cargosender-8005b",
    storageBucket: "cargosender-8005b.appspot.com",
    messagingSenderId: "739740706034",
    appId: "1:739740706034:web:df2bb3e78550301578dc6b",
    measurementId: "G-RBE6SQYZR2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return app;
};
const app = getFirebaseClientApp() as unknown as FirebaseApp;
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
function LoginPage() {
  const [user, setUser] = useState<any>(null);
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        console.log(res.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <button onClick={handleLogin}>Click to login</button>
    </div>
  );
}

export default LoginPage;
