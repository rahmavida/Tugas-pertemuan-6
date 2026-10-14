const elProvinsi  = document.getElementById("provinsi");
const elKabupaten = document.getElementById("kabupaten");
const elKecamatan = document.getElementById("kecamatan");
const tombol      = document.getElementById("cari");
const ringkas     = document.getElementById("ringkas");
const daftar      = document.getElementById("daftar");
const PETUNJUK    = "Pilih provinsi, kabupaten/kota, dan kecamatan, lalu tekan Cari kode pos.";

// Isi satu dropdown. Kalau pilihannya kosong, dropdown dinonaktifkan.
function isiPilihan(select, nama, labelSiap, labelKosong) {
    select.innerHTML = "";
    select.add(new Option(nama.length ? labelSiap : labelKosong, ""));
    nama.forEach(function (n) { select.add(new Option(n, n)); });
    select.disabled = nama.length === 0;
}

function kosongkanHasil() {
    daftar.innerHTML = "";
    ringkas.textContent = PETUNJUK;
}

function perbaruiTombol() {
    tombol.disabled = !(elProvinsi.value && elKabupaten.value && elKecamatan.value);
}

elProvinsi.addEventListener("change", function () {
    const kab = elProvinsi.value ? Object.keys(dataKodePos[elProvinsi.value]) : [];
    isiPilihan(elKabupaten, kab, "Pilih kabupaten/kota", "Pilih provinsi dulu");
    isiPilihan(elKecamatan, [], "", "Pilih kabupaten/kota dulu");
    kosongkanHasil();
    perbaruiTombol();
});

elKabupaten.addEventListener("change", function () {
    const kec = elKabupaten.value
        ? Object.keys(dataKodePos[elProvinsi.value][elKabupaten.value]) : [];
    isiPilihan(elKecamatan, kec, "Pilih kecamatan", "Pilih kabupaten/kota dulu");
    kosongkanHasil();
    perbaruiTombol();
});

elKecamatan.addEventListener("change", function () {
    kosongkanHasil();
    perbaruiTombol();
});

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

isiPilihan(elProvinsi, Object.keys(dataKodePos), "Pilih provinsi", "");
isiPilihan(elKabupaten, [], "", "Pilih provinsi dulu");
isiPilihan(elKecamatan, [], "", "Pilih kabupaten/kota dulu");