// Import modul Firebase yang dibutuhkan
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Ambil elemen tombol
const buttonPost = document.getElementById('saveData');

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYCafXDQ6Rar6DlH23jzYa6SMLJ9w1MUc",
  authDomain: "naive-bayes-6edd4.firebaseapp.com",
  databaseURL: "https://naive-bayes-6edd4-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "naive-bayes-6edd4",
  storageBucket: "naive-bayes-6edd4.appspot.com",
  messagingSenderId: "564595812915",
  appId: "1:564595812915:web:0cf54f203ccfdc3721d146"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Fungsi POST (Menambah Data)
buttonPost.addEventListener('click', (event) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;

      // Ambil tanggal sekarang
      const now = new Date();
      const tanggalSekarang = now.toISOString(); // format ISO 8601 (contoh: 2023-08-27T14:07:00.000Z)

      // Data yang akan disimpan
      const data = {
        name: namaPasien,
        age: umurPasien,
        diagnosa: penyakitTerklasifikasi,
        date: tanggalSekarang
      };

      // Menyimpan data dengan ID unik
      const dbRef = ref(database, 'users/' + userId);
      push(dbRef, data) // Menggunakan push untuk membuat ID unik
        .then(() => {
          alert('Data posted successfully!');
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    } else {
      alert('No user is signed in.');
    }
  });
});
