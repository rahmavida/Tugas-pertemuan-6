# Tugas pertemuan 6

Laporan ini berisi dokumentasi dua website yang dibuat menggunakan HTML, CSS, dan JavaScript murni: **Registrasi Mata Kuliah** (Bagian 1) dan **Cari Kode Pos Indonesia** (Bagian 2).

```
tugas-javascript/
├── README.md
├── registrasi/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── kodepos/
    ├── index.html
    ├── style.css
    ├── data.js
    └── script.js
```

## Daftar Isi

- [**Bagian 1: Registrasi Mata Kuliah**](#bagian-1-registrasi-mata-kuliah)
- [**Bagian 2: Cari Kode Pos Indonesia (Pulau Jawa)**](#bagian-2-cari-kode-pos-indonesia-pulau-jawa)

---

## Bagian 1: Registrasi Mata Kuliah

[Kembali ke daftar isi](#daftar-isi)

Website sederhana berupa formulir registrasi mata kuliah dengan rekomendasi nama, dropdown dinamis, dan validasi input. Website ini dibuat sebagai latihan mata kuliah Pemrograman Web untuk menerapkan manipulasi DOM, validasi form, dan penanganan event menggunakan JavaScript.

### 1.1 Tujuan

Website ini dibuat untuk:

- menyediakan formulir registrasi mata kuliah yang dilengkapi validasi input;
- menampilkan rekomendasi nama ketika pengguna mengetik huruf tertentu;
- menerapkan dropdown dinamis, yaitu pilihan dosen yang menyesuaikan mata kuliah yang dipilih;
- menampilkan daftar mahasiswa yang sudah terdaftar dan mencegah pendaftaran ganda;
- menerapkan konsep dasar JavaScript pada sisi client melalui pengolahan form dan interaksi pengguna.

### 1.2 Fitur

#### A. Formulir Registrasi

Formulir digunakan untuk memasukkan informasi pendaftaran yang terdiri dari:

- **Nama Mahasiswa**: diisi pengguna. Saat mengetik huruf awal, muncul rekomendasi nama. Jika sebuah nama dipilih, NRP terisi otomatis.
- **NRP**: identitas mahasiswa.
- **Email Mahasiswa**: alamat email aktif.
- **Password**: kata sandi pendaftaran.
- **Mata Kuliah**: dropdown yang dapat diklik sekaligus diketik untuk menyaring pilihan.
- **Dosen**: dropdown yang aktif setelah mata kuliah dipilih. Pilihannya hanya dosen pengampu mata kuliah tersebut.
- **Persetujuan**: checkbox yang wajib dicentang.

Aturan validasi pada formulir:

| Kolom | Aturan |
|---|---|
| Nama | Wajib diisi, tidak boleh mengandung angka |
| NRP | Wajib diisi, harus 10 digit angka |
| Email | Wajib diisi, format harus valid (contoh: nama@domain.com) |
| Password | Wajib diisi, minimal 6 karakter |
| Mata Kuliah | Wajib dipilih dari daftar |
| Dosen | Aktif setelah mata kuliah dipilih, wajib dipilih dari daftar |
| Persetujuan | Wajib dicentang |

Pesan kesalahan ditampilkan langsung di bawah kolom yang bermasalah dan hilang ketika pengguna mulai memperbaiki isian.

#### B. Tombol Daftar dan Reset

Tombol **Daftar** digunakan untuk mengirimkan data registrasi. Jika seluruh isian valid, data masuk ke tabel pendaftar dan pesan keberhasilan ditampilkan di bawah formulir. Jika mahasiswa dengan NRP yang sama sudah terdaftar pada mata kuliah yang sama, pendaftaran ditolak dan pesan peringatan ditampilkan.

Tombol **Reset** digunakan untuk mengosongkan seluruh isian beserta pesan kesalahan.

#### C. Tabel Sudah Terdaftar

Setiap pendaftaran yang berhasil ditampilkan pada tabel berisi nama, NRP, email, mata kuliah, dan dosen. Setiap baris memiliki tombol **Hapus** untuk membatalkan pendaftaran. Password tidak ditampilkan pada tabel.

### 1.3 Alur Penggunaan

```
Membuka Website
       ↓
Mengetik Nama (pilih dari rekomendasi)
       ↓
NRP Terisi Otomatis
       ↓
Mengisi Email dan Password
       ↓
Memilih Mata Kuliah
       ↓
Memilih Dosen Pengampu
       ↓
Mencentang Persetujuan
       ↓
Klik "Daftar"
       ↓
Data Divalidasi
       ↓
Data Masuk ke Tabel Pendaftar
```

Jika pengguna ingin mengulang pengisian, pengguna dapat memilih tombol Reset.

### 1.4 Struktur Halaman

Halaman terdiri dari satu kartu utama yang berisi tiga bagian:

**Formulir Registrasi**
Area untuk mengisi data dan memilih mata kuliah serta dosen.

**Kotak Hasil**
Menampilkan pesan keberhasilan atau peringatan setelah tombol Daftar ditekan.

**Tabel Sudah Terdaftar**
Menampilkan daftar pendaftar beserta jumlahnya. Pada layar yang sempit, tabel dapat digulir ke samping.

### 1.5 Struktur File

```
registrasi/
├── index.html    # struktur halaman
├── style.css     # tampilan dan tata letak
└── script.js     # rekomendasi, dropdown dinamis, validasi, dan tabel pendaftar
```

### 1.6 Catatan

- Data pendaftar hanya disimpan sementara di dalam halaman. Data hilang ketika halaman dimuat ulang karena tidak ada database atau server
- Password hanya divalidasi panjangnya dan tidak disimpan
- Data mahasiswa, mata kuliah, dan dosen pada rekomendasi merupakan data contoh yang ditulis langsung di `script.js`

### 1.7 Referensi

Pola validasi form dan validasi email dikembangkan dari tutorial berikut, lalu disesuaikan dengan kebutuhan latihan:

- GeeksforGeeks, *JavaScript Form Validation*: https://www.geeksforgeeks.org/javascript/form-validation-using-javascript/
- GeeksforGeeks, *JavaScript Application For Email Validation*: https://www.geeksforgeeks.org/html/javascript-application-for-email-validation/

---

## Bagian 2: Cari Kode Pos Indonesia (Pulau Jawa)

[Kembali ke daftar isi](#daftar-isi)

Website pencarian kode pos berdasarkan wilayah. Pengguna memilih provinsi, kabupaten/kota, dan kecamatan secara berurutan, lalu website menampilkan seluruh kelurahan atau desa di kecamatan tersebut beserta kode posnya. Data wilayah disimpan lokal di dalam proyek, sehingga pencarian berjalan tanpa API maupun server. Cakupan datanya terbatas pada enam provinsi di Pulau Jawa.

### 2.1 Fitur

- Tiga dropdown bertingkat: pilihan kabupaten/kota bergantung pada provinsi, dan pilihan kecamatan bergantung pada kabupaten/kota.
- Dropdown yang belum bisa dipilih dinonaktifkan beserta petunjuk singkat (misalnya "Pilih provinsi dulu").
- Tombol **Cari kode pos** baru aktif setelah ketiga dropdown terisi.
- Hasil berupa ringkasan jumlah temuan dan kartu untuk setiap kelurahan/desa yang memuat kode pos, nama kelurahan, serta informasi daerahnya (kecamatan, kabupaten/kota, provinsi).
- Hasil lama otomatis dihapus ketika pilihan wilayah diubah, sehingga hasil tidak tertukar.
- Tampilan menyesuaikan layar: dua kolom di layar lebar, satu kolom di layar kecil.

### 2.2 Struktur File

```
kodepos/
├── index.html    # struktur halaman
├── style.css     # tampilan dan tata letak
├── data.js       # data wilayah dan kode pos
└── script.js     # logika dropdown bertingkat dan pencarian
```

| File | Peran |
|---|---|
| `index.html` | Kerangka halaman: tiga dropdown, tombol cari, dan area hasil. Dropdown dikosongkan di HTML dan diisi oleh JavaScript. |
| `style.css` | Warna, tata letak dua kolom, tampilan dropdown, tombol, dan kartu hasil. |
| `data.js` | Menyimpan seluruh data dalam satu objek bernama `dataKodePos`. |
| `script.js` | Membaca `dataKodePos`, mengisi dropdown, dan menampilkan hasil. |

Urutan pemuatan penting. Pada `index.html`, `data.js` dimuat sebelum `script.js`:

```html
<script src="data.js"></script>
<script src="script.js"></script>
```

`dataKodePos` dideklarasikan di `data.js`, lalu dipakai oleh `script.js`. Jika urutannya dibalik, `script.js` berjalan sebelum datanya ada dan terjadi error.

### 2.3 Data (data.js)

Keterangan pada baris pertama file menyebutkan sumber data: database kode pos PT Pos Indonesia (2015), terbatas pada provinsi di Pulau Jawa.

#### 2.3.1 Bentuk data

Data disusun sebagai objek bersarang tiga tingkat. Setiap tingkat memakai nama wilayah sebagai kunci, dan tingkat terakhir berisi array pasangan `[nama kelurahan, kode pos]`.

```javascript
const dataKodePos = {
    "Banten": {                    // provinsi
        "Cilegon": {               // kabupaten/kota
            "Cibeber": [           // kecamatan
                ["Kedaleman", "42422"],   // [kelurahan/desa, kode pos]
                ["Cibeber",   "42423"],
                ...
            ],
            ...
        },
        ...
    },
    ...
};
```

Cara mengakses data mengikuti jalur wilayahnya:

| Ekspresi | Hasil |
|---|---|
| `Object.keys(dataKodePos)` | Daftar provinsi |
| `Object.keys(dataKodePos[prov])` | Daftar kabupaten/kota dalam provinsi tersebut |
| `Object.keys(dataKodePos[prov][kab])` | Daftar kecamatan dalam kabupaten/kota tersebut |
| `dataKodePos[prov][kab][kec]` | Array `[kelurahan, kode pos]` untuk kecamatan tersebut |

Contoh: `dataKodePos["Jawa Timur"]["Surabaya"]["Sukolilo"]` menghasilkan tujuh pasangan, salah satunya `["Keputih", "60111"]`.

#### 2.3.2 Alasan memakai objek bersarang

- Setiap dropdown cukup memanggil `Object.keys()` pada tingkat yang sesuai, tanpa perlu menyaring seluruh data.
- Hubungan "kecamatan milik kabupaten tertentu" sudah tertulis di struktur datanya, jadi tidak ada kemungkinan kecamatan tertukar ke kabupaten lain.
- Pencarian hasil berupa akses langsung berdasarkan tiga kunci, bukan perulangan.

Data disimpan sebagai berkas `.js` (bukan `.json`) agar dapat dimuat dengan tag `<script>`. Mengambil berkas JSON lokal dengan `fetch` umumnya diblokir browser ketika halaman dibuka langsung dari berkas (`file://`).

#### 2.3.3 Cakupan data

| Provinsi | Kabupaten/Kota | Kecamatan | Kelurahan/Desa |
|---|---|---|---|
| Banten | 6 | 155 | 1.551 |
| DKI Jakarta | 6 | 44 | 267 |
| Jawa Barat | 21 | 626 | 5.934 |
| Jawa Tengah | 31 | 573 | 8.578 |
| DI Yogyakarta | 5 | 78 | 438 |
| Jawa Timur | 31 | 664 | 8.505 |
| **Total** | **100** | **2.140** | **25.273** |

Seluruh kode pos pada data berformat lima digit angka.

### 2.4 Dokumentasi index.html

```html
<form id="form" class="panel">
    <label for="provinsi"><b>1</b>Provinsi</label>
    <select id="provinsi"></select>

    <label for="kabupaten"><b>2</b>Kabupaten/Kota</label>
    <select id="kabupaten"></select>

    <label for="kecamatan"><b>3</b>Kecamatan</label>
    <select id="kecamatan"></select>

    <button type="submit" id="cari" disabled>Cari kode pos</button>
</form>

<section class="hasil" aria-live="polite">
    <h2>Hasil pencarian</h2>
    <p id="ringkas" class="kosong">Pilih provinsi, kabupaten/kota, dan kecamatan, lalu tekan Cari kode pos.</p>
    <ul id="daftar" class="daftar"></ul>
</section>
```

| Bagian | Penjelasan |
|---|---|
| `<select>` kosong | Isi pilihan tidak ditulis di HTML. JavaScript yang mengisinya dari `dataKodePos`, sehingga menambah wilayah cukup dengan mengubah `data.js`. |
| `<b>1</b>`, `<b>2</b>`, `<b>3</b>` pada label | Penanda urutan pengisian yang dibuat menjadi lingkaran bernomor oleh CSS. |
| `disabled` pada tombol | Tombol nonaktif sejak awal dan diaktifkan oleh `perbaruiTombol()`. |
| `<form id="form">` | Memungkinkan pencarian dijalankan lewat event `submit`, sehingga tombol Enter pada keyboard juga bekerja. |
| `aria-live="polite"` | Membuat pembaca layar membacakan perubahan hasil tanpa mengganggu aktivitas pengguna. |
| `<p id="ringkas">` | Menampilkan petunjuk awal, lalu berubah menjadi ringkasan jumlah temuan. |
| `<ul id="daftar">` | Wadah kartu hasil. Isinya dibuat oleh JavaScript. |

Halaman memuat font Manrope dari Google Fonts. Jika font tidak dapat dimuat (misalnya tanpa internet), tampilan memakai Segoe UI atau font sistem sebagai cadangan.

### 2.5 Dokumentasi style.css

#### 2.5.1 Variabel warna

Warna didefinisikan sekali pada `:root` lalu dipakai dengan `var(--nama)`. Palet yang dipakai adalah ungu pastel sebagai warna utama (`--aksen`), dengan kuning lembut (`--pos-*`) khusus untuk kartu kode pos supaya hasil mudah dibedakan dari formulir.

#### 2.5.2 Tata letak dua kolom

```css
.halaman {
    max-width: 1020px;
    margin: 0 auto;
    padding: 48px 20px;
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 24px;
    align-items: start;
}

.kepala { grid-column: 1 / -1; }
```

- `display: grid` dengan `grid-template-columns: 320px 1fr` membuat panel formulir berlebar tetap 320px dan area hasil memakai sisa ruang.
- `.kepala` memakai `grid-column: 1 / -1` agar judul membentang melintasi kedua kolom.
- `align-items: start` mencegah panel yang pendek ikut diregangkan mengikuti tinggi panel hasil.

#### 2.5.3 Dropdown

```css
select {
    appearance: none;
    background: var(--kolom) url("data:image/svg+xml,...") no-repeat right 14px center;
    ...
}
select:disabled { cursor: not-allowed; background-color: #f1eff5; ... }
select:hover:not(:disabled) { border-color: var(--aksen); }
```

- `appearance: none` menghapus tampilan dropdown bawaan browser, lalu tanda panah diganti dengan gambar SVG yang disisipkan langsung sebagai `data:` URI, sehingga tidak butuh berkas gambar terpisah.
- Dropdown yang dinonaktifkan tampil pucat dengan kursor `not-allowed`, sesuai logika JavaScript yang mengaktifkannya bertahap.
- `:hover:not(:disabled)` memastikan efek hover hanya muncul pada dropdown yang bisa dipakai.
- `:focus-visible` memberi lingkaran bayangan ungu pada elemen yang sedang difokuskan lewat keyboard.

#### 2.5.4 Tombol

Tombol memakai warna ungu penuh dengan efek terangkat saat hover. Keadaan `:disabled` mengubahnya menjadi abu-abu tanpa bayangan, sehingga pengguna dapat melihat bahwa tombol belum bisa dipakai.

#### 2.5.5 Kartu hasil

```css
.daftar {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 14px;
}

.pos {
    font-size: 26px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
}
```

- `repeat(auto-fill, minmax(200px, 1fr))` membuat jumlah kolom kartu menyesuaikan lebar yang tersedia. Setiap kartu minimal 200px, dan tidak diperlukan media query khusus untuk daftar kartu.
- `.pos` menampilkan kode pos dengan huruf besar dan tebal. `tabular-nums` membuat lebar tiap angka sama sehingga kode pos pada kartu yang berbeda tampak rapi.
- Kartu bergaris putus-putus kuning dan terangkat sedikit saat di-hover.

#### 2.5.6 Responsif

```css
@media (max-width: 760px) {
    .halaman { grid-template-columns: 1fr; }
}
```

Pada layar selebar 760px atau kurang, tata letak berubah menjadi satu kolom: formulir di atas, hasil di bawahnya.

### 2.6 Dokumentasi script.js

Alur utama script: **mengisi dropdown dari data, menjaga ketergantungan antardropdown, lalu menampilkan hasil saat form dikirim.**

#### 2.6.1 Referensi elemen dan konstanta

```javascript
const elProvinsi  = document.getElementById("provinsi");
const elKabupaten = document.getElementById("kabupaten");
const elKecamatan = document.getElementById("kecamatan");
const tombol      = document.getElementById("cari");
const ringkas     = document.getElementById("ringkas");
const daftar      = document.getElementById("daftar");
const PETUNJUK    = "Pilih provinsi, kabupaten/kota, dan kecamatan, lalu tekan Cari kode pos.";
```

Elemen diambil sekali dengan `getElementById` dan disimpan dalam variabel. Teks petunjuk disimpan dalam konstanta `PETUNJUK` karena dipakai di lebih dari satu tempat.

#### 2.6.2 Fungsi isiPilihan(): pengisi dropdown

```javascript
function isiPilihan(select, nama, labelSiap, labelKosong) {
    select.innerHTML = "";
    select.add(new Option(nama.length ? labelSiap : labelKosong, ""));
    nama.forEach(function (n) { select.add(new Option(n, n)); });
    select.disabled = nama.length === 0;
}
```

Fungsi ini dipakai untuk ketiga dropdown, baik saat halaman dibuka maupun saat pilihan berubah.

| Parameter | Arti |
|---|---|
| `select` | Dropdown yang diisi. |
| `nama` | Array nama wilayah yang menjadi pilihan. |
| `labelSiap` | Teks pilihan awal jika ada data (misalnya "Pilih kabupaten/kota"). |
| `labelKosong` | Teks pilihan awal jika data kosong (misalnya "Pilih provinsi dulu"). |

Langkah kerjanya:

1. `select.innerHTML = ""` menghapus seluruh pilihan lama.
2. Satu pilihan awal ditambahkan dengan nilai kosong `""`. Teksnya memakai `labelSiap` bila `nama` berisi data, atau `labelKosong` bila kosong. Nilai kosong ini yang membuat dropdown dianggap "belum dipilih".
3. Setiap nama ditambahkan sebagai pilihan lewat `new Option(teks, nilai)`. Teks dan nilainya sama, yaitu nama wilayah, karena nama itulah kunci pada `dataKodePos`.
4. Dropdown dinonaktifkan jika tidak ada pilihan (`nama.length === 0`).

Dengan satu fungsi ini, pengaktifan dan penonaktifan dropdown terjadi otomatis mengikuti ada tidaknya data.

#### 2.6.3 Fungsi bantu

```javascript
function kosongkanHasil() {
    daftar.innerHTML = "";
    ringkas.textContent = PETUNJUK;
}

function perbaruiTombol() {
    tombol.disabled = !(elProvinsi.value && elKabupaten.value && elKecamatan.value);
}
```

- `kosongkanHasil()` menghapus semua kartu dan mengembalikan teks petunjuk awal.
- `perbaruiTombol()` mengaktifkan tombol hanya jika ketiga dropdown punya nilai. Pilihan awal bernilai string kosong yang dianggap salah (*falsy*) oleh JavaScript, sehingga satu dropdown yang belum dipilih sudah cukup untuk membuat tombol tetap nonaktif.

#### 2.6.4 Dropdown bertingkat: tiga event change

**Saat provinsi berubah**

```javascript
elProvinsi.addEventListener("change", function () {
    const kab = elProvinsi.value ? Object.keys(dataKodePos[elProvinsi.value]) : [];
    isiPilihan(elKabupaten, kab, "Pilih kabupaten/kota", "Pilih provinsi dulu");
    isiPilihan(elKecamatan, [], "", "Pilih kabupaten/kota dulu");
    kosongkanHasil();
    perbaruiTombol();
});
```

1. Daftar kabupaten/kota diambil dengan `Object.keys()` pada data provinsi terpilih. Jika provinsi dikembalikan ke pilihan kosong, daftarnya `[]`.
2. Dropdown kabupaten/kota diisi ulang.
3. Dropdown kecamatan **direset** menjadi kosong dan nonaktif, karena kecamatan lama belum tentu ada pada provinsi yang baru.
4. Hasil lama dihapus dan tombol dievaluasi ulang (menjadi nonaktif).

**Saat kabupaten/kota berubah**

```javascript
elKabupaten.addEventListener("change", function () {
    const kec = elKabupaten.value
        ? Object.keys(dataKodePos[elProvinsi.value][elKabupaten.value]) : [];
    isiPilihan(elKecamatan, kec, "Pilih kecamatan", "Pilih kabupaten/kota dulu");
    kosongkanHasil();
    perbaruiTombol();
});
```

Daftar kecamatan diambil dengan dua kunci (provinsi lalu kabupaten/kota). Dropdown kecamatan diisi ulang, hasil dihapus, dan tombol dievaluasi ulang.

**Saat kecamatan berubah**

```javascript
elKecamatan.addEventListener("change", function () {
    kosongkanHasil();
    perbaruiTombol();
});
```

Tidak ada dropdown di bawahnya, sehingga hanya hasil lama yang dihapus dan tombol yang diperbarui. Jika kecamatan sudah terpilih, tombol menjadi aktif.

#### 2.6.5 Menampilkan hasil saat form dikirim

```javascript
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const prov = elProvinsi.value, kab = elKabupaten.value, kec = elKecamatan.value;
    const baris = dataKodePos[prov][kab][kec];

    ringkas.textContent = "Ditemukan " + baris.length + " kelurahan/desa di Kecamatan "
        + kec + ", " + kab + ", " + prov + ".";
    daftar.innerHTML = "";

    baris.forEach(function (item) {
        const li = document.createElement("li");

        const pos = document.createElement("span");
        pos.className = "pos";
        pos.textContent = item[1];

        const info = document.createElement("div");
        const kel = document.createElement("span");
        kel.className = "kel";
        kel.textContent = item[0];
        const wil = document.createElement("span");
        wil.className = "wil";
        wil.textContent = "Kecamatan " + kec + ", " + kab + ", " + prov;
        info.append(kel, wil);

        li.append(pos, info);
        daftar.appendChild(li);
    });
});
```

Langkahnya:

1. `e.preventDefault()` mencegah form memuat ulang halaman.
2. Nilai ketiga dropdown dibaca. Karena nilainya adalah kunci data, jalur `dataKodePos[prov][kab][kec]` langsung menghasilkan array kelurahan dan kode pos kecamatan tersebut.
3. Ringkasan disusun dari jumlah baris (`baris.length`) dan nama wilayah terpilih.
4. Untuk setiap pasangan `[kelurahan, kode pos]`, dibuat satu kartu `<li>` berisi:
   - `span.pos`: kode pos (`item[1]`),
   - `span.kel`: nama kelurahan/desa (`item[0]`),
   - `span.wil`: informasi daerah, yaitu kecamatan, kabupaten/kota, dan provinsi.
5. Kartu dirakit dengan `append()` lalu dimasukkan ke daftar dengan `appendChild()`.

Teks diisi dengan `textContent`, bukan `innerHTML`, sehingga isi data selalu diperlakukan sebagai teks biasa.

Kode tidak perlu memeriksa apakah pilihan sudah lengkap, karena tombol baru aktif saat ketiga dropdown terisi. Pengamanan ini dikerjakan oleh `perbaruiTombol()`.

#### 2.6.6 Inisialisasi

```javascript
isiPilihan(elProvinsi, Object.keys(dataKodePos), "Pilih provinsi", "");
isiPilihan(elKabupaten, [], "", "Pilih provinsi dulu");
isiPilihan(elKecamatan, [], "", "Pilih kabupaten/kota dulu");
```

Tiga baris di akhir file mengisi keadaan awal: dropdown provinsi terisi dan aktif, sedangkan dropdown kabupaten/kota dan kecamatan kosong dan nonaktif. Pemanggilannya diletakkan paling bawah supaya seluruh fungsi sudah terdefinisi dan `dataKodePos` sudah tersedia.

### 2.7 Alur Kerja

Aliran data dari `dataKodePos` ke tampilan:

```
dataKodePos
   ├─ Object.keys(dataKodePos)               → pilihan Provinsi
   ├─ Object.keys(dataKodePos[prov])         → pilihan Kabupaten/Kota
   ├─ Object.keys(dataKodePos[prov][kab])    → pilihan Kecamatan
   └─ dataKodePos[prov][kab][kec]            → kartu hasil [kelurahan, kode pos]
```

Keadaan halaman pada setiap langkah:

| Langkah | Provinsi | Kabupaten/Kota | Kecamatan | Tombol | Area hasil |
|---|---|---|---|---|---|
| Halaman dibuka | Aktif, 6 pilihan | Nonaktif | Nonaktif | Nonaktif | Petunjuk awal |
| Memilih provinsi | Terpilih | Aktif, terisi | Direset, nonaktif | Nonaktif | Dikosongkan |
| Memilih kabupaten/kota | Terpilih | Terpilih | Aktif, terisi | Nonaktif | Dikosongkan |
| Memilih kecamatan | Terpilih | Terpilih | Terpilih | **Aktif** | Dikosongkan |
| Klik Cari kode pos | Tetap | Tetap | Tetap | Aktif | Ringkasan dan kartu kode pos |
| Mengubah pilihan di atasnya | Berubah | Diisi ulang | Direset | Nonaktif | Dikosongkan |

Prinsip yang dipakai: **setiap perubahan pada satu dropdown mereset semua dropdown di bawahnya dan menghapus hasil**, sehingga tidak pernah ada kombinasi wilayah yang tidak cocok atau hasil lama yang tertinggal.

### 2.8 Contoh Pengujian Fungsional

Isi data pada skenario berikut diperiksa langsung dari `data.js`.

| Skenario | Langkah | Hasil yang diharapkan |
|---|---|---|
| Keadaan awal | Buka halaman | Hanya dropdown provinsi aktif (6 pilihan). Tombol nonaktif. |
| Dropdown bertingkat | Pilih DI Yogyakarta | Kabupaten/kota berisi 5 pilihan: Bantul, Gunung Kidul, Kulon Progo, Sleman, Yogyakarta. |
| Provinsi lain | Pilih DKI Jakarta | Kabupaten/kota berisi 6 pilihan, termasuk Kepulauan Seribu. |
| Pencarian lengkap | Jawa Timur, Surabaya, Sukolilo, lalu Cari | Ringkasan menyebut 7 kelurahan/desa. Keputih tampil dengan kode pos 60111. |
| Satu kode pos untuk beberapa kelurahan | Banten, Cilegon, Citangkil, lalu Cari | 7 kartu. Citangkil dan Tamanbaru sama-sama berkode pos 42441. |
| Mengubah provinsi | Setelah mencari, ganti provinsi | Hasil hilang, kabupaten/kota diganti, kecamatan kosong dan nonaktif, tombol nonaktif. |
| Mengubah kabupaten/kota | Setelah mencari, ganti kabupaten/kota | Hasil hilang, kecamatan diisi ulang, tombol nonaktif. |
| Mengubah kecamatan | Setelah mencari, ganti kecamatan | Hasil hilang, tombol tetap aktif. |
| Mengosongkan pilihan | Kembalikan provinsi ke "Pilih provinsi" | Kabupaten/kota dan kecamatan kembali nonaktif. |
| Layar kecil | Perkecil lebar jendela hingga 760px atau kurang | Tata letak berubah menjadi satu kolom. |

Skenario ini disusun berdasarkan logika kode dan isi data, bukan hasil eksekusi otomatis di browser.

### 2.9 Batasan

- **Cakupan wilayah terbatas** pada enam provinsi di Pulau Jawa: Banten, DKI Jakarta, Jawa Barat, Jawa Tengah, DI Yogyakarta, dan Jawa Timur.
- **Data bersumber dari tahun 2015** sesuai keterangan di `data.js`, sehingga dapat berbeda dari pembagian wilayah dan kode pos terkini.
- **Kabupaten dan kota yang bernama sama muncul sebagai satu pilihan.** Nama dipakai sebagai kunci data, sehingga misalnya Kediri, Malang, dan Madiun masing-masing memuat kecamatan dari kabupaten sekaligus kotanya.
- **Seluruh data dimuat sekaligus** (berkas `data.js` berukuran sekitar 570 KB) saat halaman dibuka.
- **Pencarian hanya lewat dropdown.** Belum ada fitur mengetik kode pos atau nama kelurahan secara langsung.
- Font Manrope memerlukan internet. Tanpa internet, tampilan memakai font cadangan.
  
[Kembali ke daftar isi](#daftar-isi)
