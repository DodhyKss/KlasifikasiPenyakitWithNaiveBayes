import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"

let loggedInUserId = "";
let noHpUser = "";

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    loggedInUserId=localStorage.getItem('loggedInUserId');

    if(loggedInUserId){
        const docRef = doc(db, "user", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserAddress').innerText=userData.address;
                document.getElementById('loggedUserPhone').innerText=userData.nohp;
                noHpUser = userData.nohp;
            }else{
                console.log("no document matching id");
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }else{
        console.log("User id not found in local storage");
    }
  })

  const logoutButton= document.getElementById('logout');

  logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../index.html';
    })
    .catch((error)=>{
        console.error('Error Sigin out:', error);
    })
  });

  document.getElementById('sendMessageWa').addEventListener('click', function() {
    const phoneNumber = "6281999819265"; // Ganti dengan nomor tujuan (dalam format internasional, tanpa tanda +)
    const message = "Ubah data | id pengirim: "+loggedInUserId + " | No Hp User: "+noHpUser; // Pesan yang ingin dikirim

    // Mengencode pesan untuk digunakan dalam URL
    const encodedMessage = encodeURIComponent(message);

    // Membuat URL WhatsApp dengan nomor tujuan dan pesan
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Membuka URL WhatsApp di tab baru (atau bisa juga di tab yang sama)
    window.open(whatsappUrl, '_blank');
});


