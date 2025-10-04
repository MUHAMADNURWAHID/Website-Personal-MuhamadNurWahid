// Logika Pembukaan Buku (Tanpa Input Nama)
document.getElementById('openBookBtn').addEventListener('click', () => {
    // Animasi pembuka: layar intro menghilang
    document.getElementById('introScreen').style.opacity = '0';
    
    // Setelah transisi opacity selesai
    setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
        document.getElementById('bookContainer').style.display = 'flex';
        
        // Coba putar musik
        const music = document.getElementById('bg-music');
        music.play().catch(error => {
            console.warn("Musik gagal diputar otomatis:", error);
        });
        
        // Tampilkan tombol Next untuk memicu pembukaan sampul
        nextBtn.style.display = 'block'; 

    }, 1000); 
});

// Logika Navigasi Halaman
const pages = document.querySelectorAll('.book-page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bookCover = document.getElementById('bookCover');
const totalPages = pages.length; 

// Dimulai dari -1: status sebelum sampul dibuka
let currentPageIndex = -1; 

function updatePage() {
    
    // Sembunyikan semua tombol jika belum membuka sampul
    if (currentPageIndex === -1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'block'; 
        return;
    }

    // Atur tombol navigasi
    prevBtn.style.display = currentPageIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentPageIndex < totalPages ? 'block' : 'none';
    
    // Atur status flip dan z-index halaman
    for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        if (i < currentPageIndex) {
            // Halaman sudah terbalik
            page.classList.add('flipped');
            // Z-index tinggi untuk halaman yang sudah di-flip
            page.style.zIndex = totalPages + i + 1; 
        } else {
            // Halaman belum terbalik
            page.classList.remove('flipped');
            // Z-index normal (menurun sesuai urutan halaman)
            page.style.zIndex = totalPages - i;
        }
    }
}

nextBtn.addEventListener('click', () => {
    
    // Aksi Klik Pertama (currentPageIndex = -1) -> Buka Sampul
    if (currentPageIndex === -1) {
        bookCover.classList.add('open');
        currentPageIndex = 0; 
        // Beri waktu animasi sampul selesai (1.2 detik di CSS)
        setTimeout(() => {
            updatePage(); 
        }, 1200); 
        return;
    }
    
    // Aksi Klik Selanjutnya -> Balik Halaman
    if (currentPageIndex < totalPages) { 
        currentPageIndex++;
        updatePage();
    }
});

prevBtn.addEventListener('click', () => {
    // Klik Prev dari Halaman 1 (index 0) -> Tutup Sampul
    if (currentPageIndex === 0) {
        bookCover.classList.remove('open');
        currentPageIndex = -1;
        // Beri waktu animasi sampul selesai sebelum tombol Next muncul lagi
        setTimeout(() => {
            updatePage();
        }, 800); 
    } 
    // Pindah ke halaman sebelumnya
    else if (currentPageIndex > 0) {
        currentPageIndex--;
        updatePage();
    }
});

// Inisialisasi: Sembunyikan semua tombol navigasi di awal
prevBtn.style.display = 'none';
nextBtn.style.display = 'none';