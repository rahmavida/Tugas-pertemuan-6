// Data mahasiswa yang sudah terdaftar
const mahasiswa = [
    { nama: "Agus",  nrp: "5025251101" },
    { nama: "Budi",  nrp: "5025251102" },
    { nama: "Asep",  nrp: "5025251103" },
    { nama: "Bunga", nrp: "5025251104" },
    { nama: "Lisa",  nrp: "5025251105" },
    { nama: "Rena",  nrp: "5025251106" }
];

// Mata kuliah Semester 3 dan dosen pengampu
const mataKuliah = {
    "Jaringan Komputer": [
        "Bagus Jati Santoso, S.Kom., Ph.D.",
        "Prof. Ir. Ary Mazharuddin Shiddiqi, S.Kom., M.Comp.Sc., Ph.D.",
        "Royyana Muslim Ijtihadie, S.Kom., M.Kom., Ph.D."
    ],
    "Konsep Kecerdasan Artifisial": [
        "Prof. Dr. Eng. Nanik Suciati, S.Kom., M.Kom."
    ],
    "Konsep Pengembangan Perangkat Lunak": [
        "Bintang Nuralamsyah, S.Kom., M.Kom.",
        "Dr. Sarwosri, S.Kom., M.T."
    ],
    "Matematika Diskrit": [
        "Muhamad Hilmil Muchtar Aditya Pradana, S.Kom., M.Sc., Ph.D."
    ],
    "Pemrograman Berorientasi Objek": [
        "Ir. Misbakhul Munir Irfan Subakti, S.Kom., M.Sc., M.Phil."
    ],
    "Pemrograman Web": [
        "Fajar Baskoro, S.Kom., M.T."
    ],
    "Teori Graf": [
        "Victor Hariadi, S.Si., M.Kom."
    ]
};

// Elemen
const form        = document.getElementById("formRegistrasi");
const inputNama   = document.getElementById("nama");
const inputNrp    = document.getElementById("nrp");
const inputEmail  = document.getElementById("email");
const inputPass   = document.getElementById("password");
const inputMatkul = document.getElementById("matkul");
const inputDosen  = document.getElementById("dosen");
const inputSetuju = document.getElementById("setuju");

const kotakHasil  = document.getElementById("hasil");
const tabel       = document.getElementById("tabel");
const isiTabel    = document.getElementById("isiTabel");
const pesanKosong = document.getElementById("kosong");
const jumlah      = document.getElementById("jumlah");

const daftarPendaftar = [];
const daftarError = ["errorNama", "errorNrp", "errorEmail", "errorPassword", "errorMatkul", "errorDosen", "errorSetuju"];

// Penanda: true saat form.reset() dipanggil dari kode setelah submit berhasil
let sedangMengirim = false;

function matkulValid() {
    return Object.hasOwn(mataKuliah, inputMatkul.value);
}

function daftarDosen() {
    return matkulValid() ? mataKuliah[inputMatkul.value] : [];
}

// Fungsi Autocomplete
function pasangRekomendasi({ input, ambilData, saatDipilih, dariAwal = false, munculSaatKosong = false, daftar }) {
    function tampilkan() {
        const kata = input.value.trim().toLowerCase();

        if (kata === "" && !munculSaatKosong) {
            daftar.hidden = true;
            return;
        }

        const cocok = ambilData().filter(function (item) {
            const teks = item.toLowerCase();
            return dariAwal ? teks.startsWith(kata) : teks.includes(kata);
        });

        daftar.innerHTML = "";

        if (cocok.length === 0) {
            daftar.hidden = true;
            return;
        }

        cocok.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("mousedown", function () {
                input.value = item;
                daftar.hidden = true;
                saatDipilih(item);
            });
            daftar.appendChild(li);
        });

        daftar.hidden = false;
    }

    input.addEventListener("input", tampilkan);
    input.addEventListener("focus", tampilkan);
    input.addEventListener("blur", function () {
        daftar.hidden = true;
    });
}

function aturDosen() {
    const valid = matkulValid();
    inputDosen.disabled = !valid;
    inputDosen.value = "";
    inputDosen.placeholder = valid ? "Pilih atau ketik nama dosen" : "Pilih mata kuliah terlebih dahulu";
}

inputMatkul.addEventListener("input", aturDosen);

// Otomasi NRP jika Nama Mahasiswa Ditemukan
let nrpOtomatis = false;
inputNama.addEventListener("input", function () {
    const kata = inputNama.value.trim().toLowerCase();
    const cocok = mahasiswa.find(function (m) { return m.nama.toLowerCase() === kata; });

    if (cocok) {
        inputNrp.value = cocok.nrp;
        nrpOtomatis = true;
    } else if (nrpOtomatis) {
        inputNrp.value = "";
        nrpOtomatis = false;
    }
});

inputNrp.addEventListener("input", function () {
    nrpOtomatis = false;
});

// Rekomendasi Input
pasangRekomendasi({
    input: inputNama,
    daftar: document.getElementById("saranNama"),
    ambilData: function () { return mahasiswa.map(function (m) { return m.nama; }); },
    dariAwal: true,
    saatDipilih: function (nama) {
        const data = mahasiswa.find(function (m) { return m.nama === nama; });
        inputNrp.value = data.nrp;
        nrpOtomatis = true;
    }
});

pasangRekomendasi({
    input: inputMatkul,
    daftar: document.getElementById("saranMatkul"),
    ambilData: function () { return Object.keys(mataKuliah); },
    munculSaatKosong: true,
    saatDipilih: aturDosen
});

pasangRekomendasi({
    input: inputDosen,
    daftar: document.getElementById("saranDosen"),
    ambilData: daftarDosen,
    munculSaatKosong: true,
    saatDipilih: function () {}
});

// Fungsi Validasi 
function isiError(id, pesan) {
    document.getElementById(id).textContent = pesan;
}

function bersihkanSemuaError() {
    daftarError.forEach(function (id) { isiError(id, ""); });
}

// Menghapus pesan error secara real-time ketika user mulai mengetik ulang
[inputNama, inputNrp, inputEmail, inputPass, inputMatkul, inputDosen, inputSetuju].forEach(el => {
    el.addEventListener("input", function () {
        const idError = "error" + el.id.charAt(0).toUpperCase() + el.id.slice(1);
        if (document.getElementById(idError)) {
            isiError(idError, "");
        }
    });
});

function validateForm() {
    let isValid = true;
    bersihkanSemuaError();

    const nama = inputNama.value.trim();
    const nrp = inputNrp.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPass.value;

    // Pattern Regex untuk Email Baku (nama@domain.com)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // 1. Validasi Nama (Tidak boleh kosong & tidak boleh ada angka)
    if (nama === "") {
        isiError("errorNama", "Nama wajib diisi.");
        isValid = false;
    } else if (/\d/.test(nama)) {
        isiError("errorNama", "Nama tidak boleh mengandung angka.");
        isValid = false;
    }

    // 2. Validasi NRP (Harus 10 digit angka)
    if (!/^\d{10}$/.test(nrp)) {
        isiError("errorNrp", "NRP harus terdiri dari 10 digit angka.");
        isValid = false;
    }

    // 3. Validasi Email
    if (email === "") {
        isiError("errorEmail", "Email wajib diisi.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        isiError("errorEmail", "Format email tidak valid (contoh: nama@domain.com).");
        isValid = false;
    }

    // 4. Validasi Password (Minimal 6 karakter)
    if (password === "") {
        isiError("errorPassword", "Password wajib diisi.");
        isValid = false;
    } else if (password.length < 6) {
        isiError("errorPassword", "Password minimal 6 karakter.");
        isValid = false;
    }

    // 5. Validasi Mata Kuliah & Dosen
    if (!matkulValid()) {
        isiError("errorMatkul", "Pilih mata kuliah dari daftar.");
        isValid = false;
    } else if (!daftarDosen().includes(inputDosen.value)) {
        isiError("errorDosen", "Pilih dosen dari daftar.");
        isValid = false;
    }

    // 6. Validasi Checkbox
    if (!inputSetuju.checked) {
        isiError("errorSetuju", "Anda harus menyetujui persetujuan.");
        isValid = false;
    }

    return isValid;
}

// Reset Form Event
form.addEventListener("reset", function () {
    setTimeout(function () {
        aturDosen();
        nrpOtomatis = false;
        bersihkanSemuaError();

        if (!sedangMengirim) {
            kotakHasil.hidden = true;
        }
        sedangMengirim = false;
    }, 0);
});

function tampilkanHasil(pesan, jenis) {
    kotakHasil.textContent = pesan;
    kotakHasil.className = jenis;
    kotakHasil.hidden = false;
}

function gambarTabel() {
    isiTabel.innerHTML = "";

    daftarPendaftar.forEach(function (p, index) {
        const baris = document.createElement("tr");

        [p.nama, p.nrp, p.email, p.matkul, p.dosen].forEach(function (isi) {
            const sel = document.createElement("td");
            sel.textContent = isi;
            baris.appendChild(sel);
        });

        const selAksi = document.createElement("td");
        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "hapus";
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function () {
            daftarPendaftar.splice(index, 1);
            gambarTabel();
        });
        selAksi.appendChild(tombolHapus);
        baris.appendChild(selAksi);

        isiTabel.appendChild(baris);
    });

    jumlah.textContent = daftarPendaftar.length;
    tabel.hidden = daftarPendaftar.length === 0;
    pesanKosong.hidden = daftarPendaftar.length > 0;
}

// Form Submit Handler
form.addEventListener("submit", function (e) {
    e.preventDefault();
    kotakHasil.hidden = true;

    // Jalankan validasi
    if (!validateForm()) return;

    const data = {
        nama:   inputNama.value.trim(),
        nrp:    inputNrp.value.trim(),
        email:  inputEmail.value.trim(),
        matkul: inputMatkul.value,
        dosen:  inputDosen.value
    };

    // Cek apakah NRP ini sudah terdaftar di mata kuliah yang sama
    const sudahAda = daftarPendaftar.some(function (p) {
        return p.nrp === data.nrp && p.matkul === data.matkul;
    });

    if (sudahAda) {
        tampilkanHasil(data.nama + " sudah terdaftar pada mata kuliah " + data.matkul + ".", "gagal");
        return;
    }

    daftarPendaftar.push(data);
    gambarTabel();
    tampilkanHasil(data.nama + " berhasil mendaftar di " + data.matkul + ".", "sukses");

    sedangMengirim = true;
    form.reset();
});