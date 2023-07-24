import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAESb04h7iBA7dN2v1Yj8bGD2Q-w8AXUV0",
  authDomain: "chatapp-989dd.firebaseapp.com",
  projectId: "chatapp-989dd",
  storageBucket: "chatapp-989dd.appspot.com",
  messagingSenderId: "625528042631",
  appId: "1:625528042631:web:5d90266b2f16cc8f57b422"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
