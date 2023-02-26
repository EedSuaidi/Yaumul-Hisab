const yhForm = document.getElementById("yhForm")
const yhContainer = document.getElementById("yhContainer")
const nama = document.getElementById("nama")
const pahala = document.getElementById("pahala")
const dosa = document.getElementById("dosa")

const yh = JSON.parse(localStorage.getItem("yh")) || []

const addYH = (nama, pahala, dosa, hasil) => {
    yh.push({
        nama,
        pahala,
        dosa,
        hasil
    })

    localStorage.setItem("yh", JSON.stringify(yh))

    return { nama, pahala, dosa, hasil }
}

const createYHElement = ({ nama, pahala, dosa, hasil }) => {
    // Buat Elemen
    const YHdiv = document.createElement("div")
    const YHnama = document.createElement("h2")
    const YHpahala = document.createElement("p")
    const YHdosa = document.createElement("p")
    const YHhasil = document.createElement("p")

    // Isi Konten
    YHnama.innerText = "Nama : " + nama
    YHpahala.innerText = "Pahala : " + pahala
    YHdosa.innerText = "Dosa : " + dosa
    YHhasil.innerText = "Hasil : " + hasil

    // Tambah ke DOM
    YHdiv.append(YHnama, YHpahala, YHdosa, YHhasil)
    yhContainer.appendChild(YHdiv)
}

yh.forEach(createYHElement)

yhForm.onsubmit = e => {
    e.preventDefault()

    let vnama = nama.value
    let vpahala = pahala.value
    let vdosa = dosa.value
    let hasil
    if ( vpahala / vdosa >= 10 ) {
        hasil = "Sangat Mukmin Sekali Banget"
    } else if ( vpahala / vdosa >= 3 ) {
        hasil = "Mukmin"
    } else if ( vpahala / vdosa > 1 ) {
        hasil = "Semi Mukmin"
    } else if ( vpahala == vdosa ) {
        hasil = "Netral"
    } else if ( vpahala / vdosa >= 0.3 ) {
        hasil = "Semi Kafir"
    } else if ( vpahala / vdosa >= 0.1 || vpahala / vdosa < 0.1 ) {
        hasil = "Iblis Murni"
    }

    const newYH = addYH(
        vnama,
        vpahala,
        vdosa,
        hasil
    )

    createYHElement(newYH)

    nama.value = ""
    pahala.value = ""
    dosa.value = ""
}
