

// naivebayes.js
// Data pelatihan (Contoh)
const dataset = [
    {gejala: ["mual", "muntah", "pusing"], penyakit: "Morning Sickness"},
    {gejala: ["nyeri_perut", "pendarahan", "pusing"], penyakit: "Keguguran"},
    {gejala: ["demam", "nyeri_perut", "kram_perut"], penyakit: "Preeklamsia"},
    // Tambahkan lebih banyak data pelatihan di sini
];

let penyakitTerklasifikasi = "";
let namaPasien = "";
let umurPasien = null;

function naiveBayes(inputGejala) {
    let hasil = {};
    let perhitungan = [];

    dataset.forEach(data => {
        let penyakit = data.penyakit;
        let probabilitas = 1;

        data.gejala.forEach(gejala => {
            if (inputGejala.includes(gejala)) {
                probabilitas *= 1;  // Probabilitas tinggi jika gejala cocok
            } else {
                probabilitas *= 0.5;  // Probabilitas rendah jika tidak cocok
            }
        });

        hasil[penyakit] = (hasil[penyakit] || 0) + probabilitas;
        perhitungan.push({
            penyakit: penyakit,
            probabilitas: probabilitas,
            gejala: data.gejala
        });
    });

    penyakitTerklasifikasi = Object.keys(hasil).reduce((a, b) => hasil[a] > hasil[b] ? a : b);

    return {
        penyakitTerklasifikasi: penyakitTerklasifikasi,
        perhitungan: perhitungan,
        hasil: hasil
    };
}

function klasifikasi() {
    const gejalaForm = document.getElementById('gejalaForm');
    const inputGejala = Array.from(gejalaForm.elements['gejala'])
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const { penyakitTerklasifikasi, perhitungan, hasil } = naiveBayes(inputGejala);

    let resultHTML = `Penyakit yang terdeteksi: <strong>${penyakitTerklasifikasi}</strong><br><br>`;
    resultHTML += `<h3>Detail Perhitungan:</h3>`;
    resultHTML += `<ul>`;
    perhitungan.forEach(item => {
        resultHTML += `<li><strong>${item.penyakit}</strong>: Probabilitas = ${item.probabilitas.toFixed(2)}, Gejala yang dicocokkan: ${item.gejala.join(', ')}</li>`;
    });
    resultHTML += `</ul>`;

    document.getElementById('result').innerHTML = resultHTML;
    namaPasien = document.getElementById('namaPasien').value;
    umurPasien = document.getElementById('umurPasien').value;
    console.log(penyakitTerklasifikasi);
}

function kembali(){
    window.location.href='/pages/homepage.html';
}





