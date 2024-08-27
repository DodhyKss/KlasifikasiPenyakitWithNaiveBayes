  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYCafXDQ6Rar6DlH23jzYa6SMLJ9w1MUc",
    authDomain: "naive-bayes-6edd4.firebaseapp.com",
    projectId: "naive-bayes-6edd4",
    storageBucket: "naive-bayes-6edd4.appspot.com",
    messagingSenderId: "564595812915",
    appId: "1:564595812915:web:0cf54f203ccfdc3721d146"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
  }
  const signUp = document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firtsName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const address = document.getElementById('rAddress').value;
    const noHp = document.getElementById('rNoHp').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firtsName,
            lastName: lastName,
            address: address,
            nohp: noHp
        };
        showMessage('Akun berhasil dibuat!', 'signUpMessage');
        const docRef = doc(db, "user", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use'){
            showMessage('Email telah terdaftar!', 'signUpMessage');
        }else{
            showMessage('Tidak dapat membuat akun!', 'signUpMessage');
        }
    })
  });

  const signIn = document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth =  getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Login berhasil!', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = '/pages/homepage.html';

    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode=='auth/invalid-credential'){
            showMessage('Password atau Email Salah!', 'signInMessage');
        }else{
            showMessage('Akun tidak ditemukan', 'signInMessage');
        }
    })
  })