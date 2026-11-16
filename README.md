# Politeknik Bhakti Kartini — Website Statis

Versi **statis** (HTML + CSS + JavaScript) dari website Politeknik Bhakti Kartini, siap di-deploy ke **GitHub Pages**.
Tidak memerlukan PHP maupun MySQL.

## Struktur

```
index.html, about.html, services.html, gallery.html, contact.html
teknologi-rekayasa-multimedia.html, administrasi-rumah-sakit.html,
manajemen-logistik.html, farmasi.html   <- halaman detail program studi
404.html
css/style.css
js/main.js       <- navbar, animasi, lightbox, validasi + konfirmasi form kontak
js/gallery.js    <- filter kategori + pagination galeri
images/          <- semua gambar
```

## Cara deploy ke GitHub Pages

1. Upload **isi folder ini** ke repository GitHub (file `index.html` harus berada di root repo).
2. Buka **Settings → Pages**.
3. Di bagian *Build and deployment*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1-2 menit. Situs tampil di `https://USERNAME.github.io/NAMA-REPO/`.

## Mengubah konten

- **Artikel (Terkini)**: edit bagian "BERITA TERKINI" di `index.html`.
- **Program studi**: edit `services.html` dan file detail masing-masing prodi.
- **Galeri**: tambah blok `<div class="gallery-item ...">` di `gallery.html` (atur `data-category` ke `fasilitas`, `akademik`, `kegiatan`, atau `wisuda`) dan simpan fotonya di `images/`.
- **Form kontak**: karena tidak ada server, form membuka aplikasi email pengunjung (`mailto:`) ke `info@pbk.ac.id`. Ubah alamat tujuan di `js/main.js`.
  Untuk menerima pesan tanpa aplikasi email, gunakan layanan form gratis seperti Formspree atau Web3Forms.
