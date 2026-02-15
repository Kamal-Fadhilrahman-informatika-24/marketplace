*Konsep dan Implementasi Arsitektur Web Platform
Project ini dikembangkan menggunakan Next.js 14 (App Router) dengan mengimplementasikan berbagai strategi rendering modern serta manajemen state sesuai materi Teknik dan Arsitektur Pengembangan Web Platform.

1. Next.js (Framework Utama)
Project ini menggunakan Next.js 14 dengan App Router yang memungkinkan:
File-based routing
Dynamic routing
Hybrid rendering (SSG, SSR, CSR)
Automatic code splitting
Built-in optimization
Production build optimization
Struktur routing berbasis folder:
app/
 ├── page.tsx                → Home (SSG)
 ├── search/page.tsx         → Search (CSR)
 ├── product/[id]/page.tsx   → Detail (SSR)
 ├── cart/page.tsx           → Cart (Global State)
 ├── layout.tsx              → Root layout + Provider
 ├── context/CartContext.tsx → Global state
 └── types/product.ts        → Type definition

Next.js memungkinkan kombinasi berbagai strategi rendering dalam satu aplikasi (Hybrid Rendering).

2. Static Site Generation (SSG) 
-Lokasi :
app/page.tsx
-Konsep
SSG adalah teknik rendering di mana halaman dibuat saat proses build (npm run build).
Halaman utama menggunakan:
fetch("https://dummyjson.com/products?limit=10", {
  cache: "force-cache",
})

Karena menggunakan force-cache, data di-fetch saat build dan tidak diambil ulang setiap request.
📌 Karakteristik:
HTML dihasilkan saat build
Tidak bergantung pada request user
Performa sangat cepat
Cocok untuk data yang relatif stabil
-Bukti saat build:
○ /
Simbol ○ menunjukkan halaman statis.

3. Server-Side Rendering (SSR)
-Lokasi:
app/product/[id]/page.tsx
-Konsep
SSR adalah teknik rendering di mana halaman dirender ulang setiap kali ada request.
Digunakan:
fetch(`https://dummyjson.com/products/${id}`, {
  cache: "no-store",
})

no-store berarti:
Tidak menggunakan cache
Fetch dilakukan setiap request
HTML dibuat ulang di server
-Karakteristik:
Data selalu fresh
Cocok untuk data dinamis
Rendering terjadi di server
-Bukti saat build:
ƒ /product/[id]

Simbol ƒ menunjukkan dynamic server-rendered page.

4. Client-Side Rendering (CSR)
-Lokasi:
app/search/page.tsx
-Konsep
CSR terjadi ketika rendering dilakukan di browser, bukan di server.
File ini menggunakan:
"use client";
serta
useState()
useEffect()

Data difilter langsung di browser tanpa reload halaman.
-Karakteristik:
Rendering terjadi di client
Interaktif
Cocok untuk fitur real-time seperti search

5. API Publik
Project ini mengonsumsi API publik dari:
https://dummyjson.com

Digunakan untuk:
Mendapatkan daftar produk
Mendapatkan detail produk berdasarkan ID

Implementasi API terdapat di:
app/page.tsx
app/product/[id]/page.tsx
app/search/page.tsx

API digunakan sebagai sumber data eksternal (API Integration Architecture).

6. Local State
Local state digunakan pada fitur pencarian.
-Lokasi:
app/search/page.tsx

Contoh:
Tsx
const [query, setQuery] = useState("");

-Karakteristik:
Hanya berlaku dalam satu komponen
Tidak dapat diakses oleh komponen lain
Cocok untuk state sementara seperti input user

7. Context API (Global State)
Global state digunakan untuk fitur keranjang (cart).
-Lokasi Context:
app/context/CartContext.tsx

Context dibungkus dalam:
app/layout.tsx

Tsx
<CartProvider>
  {children}
</CartProvider>

Digunakan oleh:
product/[id]/AddToCartButton.tsx
cart/page.tsx

-Konsep
Context API memungkinkan state dibagikan ke banyak komponen tanpa prop drilling.
Karakteristik:
Global state
Dapat diakses lintas halaman
Cocok untuk data seperti cart, auth, dll.

8. Dynamic Routing
-Lokasi:
app/product/[id]/page.tsx
[id] adalah parameter dinamis.

Contoh URL:
/product/1
/product/2

Next.js menangkap parameter tersebut melalui params.

9. Error Boundary
Project ini menggunakan fitur Error Boundary dari Next.js App Router.
-Lokasi:
app/[id]/error.tsx
Jika terjadi error saat rendering, aplikasi tidak crash, tetapi menampilkan halaman fallback dengan opsi retry.

10. Memoization (useMemo)
Fitur search menggunakan useMemo untuk mengoptimalkan proses filtering data.
-Lokasi:
app/search/page.tsx
useMemo memastikan proses filtering hanya dijalankan ulang ketika data produk atau query berubah, sehingga meningkatkan performa aplikasi.

11. Incremental Static Regeneration (ISR)
Halaman utama menggunakan ISR dengan konfigurasi:
Ts
export const revalidate = 10;
Artinya halaman akan diregenerate setiap 10 detik jika ada request baru.
ISR menggabungkan kecepatan SSG dan fleksibilitas SSR.

12. Lazy Loading Eksplisit (Dynamic Import)
Project ini mengimplementasikan lazy loading eksplisit menggunakan next/dynamic untuk memuat komponen secara dinamis.
-Lokasi Implementasi
app/product/[id]/page.tsx

-Komponen AddToCartButton tidak di-import secara langsung, tetapi menggunakan dynamic import:
import dynamic from "next/dynamic";

const AddToCartButton = dynamic(
  () => import("./AddToCartButton"),
  {
    loading: () => <p>Loading Button...</p>,
  }
);

-Konsep
Dynamic import memungkinkan komponen dimuat hanya ketika diperlukan, bukan saat initial bundle aplikasi dimuat.
Hal ini memberikan keuntungan:
Mengurangi ukuran initial JavaScript bundle
Meningkatkan performa loading awal
Menerapkan code splitting secara eksplisit
-Kenapa Digunakan pada Halaman Product?
Komponen AddToCartButton merupakan komponen interaktif berbasis client-side.
Dengan lazy loading:
Komponen tidak langsung dikirim dalam bundle utama
Komponen hanya dimuat ketika halaman detail produk diakses
-Perbedaan dengan Code Splitting Otomatis
Next.js secara otomatis melakukan route-based code splitting.
Namun pada project ini juga diterapkan explicit code splitting menggunakan next/dynamic untuk menunjukkan kontrol performa yang lebih spesifik.

1. Caching Strategy
Project ini menerapkan dua strategi caching:
Halaman = Home, Detail
Strategi = force-cache 
, no-store

Ini menunjukkan pemahaman terhadap kontrol cache pada Next.js modern.

10. Code Splitting
Next.js secara otomatis melakukan:
Route-based code splitting
Shared chunk optimization

Bukti saat build:
First Load JS shared by all 87.2 kB

Artinya setiap route memiliki bundle terpisah untuk optimasi performa.

11. Version Control (Git & GitHub)
Project menggunakan Git untuk version control.

Perintah yang digunakan:
git add .
git commit -m "message"
git push

Repository publik:
https://github.com/Kamal-Fadhilrahman-informatika-24/web-platform-nextjs-pabp-kamal-122

Riwayat commit menunjukkan tahapan pengembangan yang sistematis.

12. Deploy Production
Project telah melalui:
npm run build
npm start

Dan di-deploy menggunakan Vercel.
Link publik:
https://web-platform-nextjs-pabp-kamal-122.vercel.app

Deployment menunjukkan aplikasi siap digunakan dalam environment production.

*Cara Menjalankan Project
Project ini dikembangkan menggunakan Next.js 14 (App Router) dan membutuhkan Node.js versi 18 atau lebih baru.

1. Clone Repository
-Clone repository dari GitHub:
git clone https://github.com/Kamal-Fadhilrahman-informatika-24/web-platform-nextjs-pabp-kamal-122.git

-Masuk ke folder project:
cd web-platform-nextjs-pabp-kamal-122

2. Install Dependencies
Pastikan Node.js sudah terinstall:
node -v

Jika sudah, install semua dependencies:
npm install

Perintah ini akan menginstall semua package yang tercantum pada package.json.

3. Menjalankan dalam
Mode Development
Untuk menjalankan aplikasi dalam mode development:
npm run dev

Kemudian buka browser dan akses:
http://localhost:3000

Mode ini digunakan untuk pengembangan dan testing fitur secara lokal.

4. Build Production
Untuk membuat versi production:
npm run build

Jika proses build berhasil tanpa error, maka aplikasi siap dijalankan dalam mode production.

5. Menjalankan Versi Production
Setelah proses build selesai, jalankan:
npm start

Kemudian akses kembali:
http://localhost:3000

Mode ini mensimulasikan lingkungan production seperti saat dideploy di server.

6. Deploy ke Production (Vercel)
Project ini telah dideploy menggunakan Vercel.

Link aplikasi online:
https://web-platform-nextjs-pabp-kamal-122.vercel.app

Setiap kali perubahan di-push ke GitHub, Vercel akan otomatis melakukan redeploy.

*Teknologi yang Digunakan
Next.js 14 (App Router)
React
TypeScript
Context API
DummyJSON Public API
Git & GitHub
Vercel Deployment
