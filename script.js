// Fungsi untuk mendapatkan tahun saat ini untuk footer
function getCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Fungsi untuk smooth scroll (jika menggunakan link internal #)
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cek apakah link hanya '#' (mungkin untuk logo atau link non-scroll)
            if (this.getAttribute('href') === '#') {
                // Bisa tambahkan scroll ke paling atas jika diinginkan
                // window.scrollTo({ top: 0, behavior: 'smooth' });
                return; // Hentikan jika hanya '#'
            }

            // Dapatkan elemen target
            const targetElement = document.querySelector(this.getAttribute('href'));

            // Jika target ada, lakukan scroll
            if (targetElement) {
                e.preventDefault(); // Mencegah perilaku default link
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Scroll hingga bagian atas elemen target terlihat
                });
            }
        });
    });
}


// --- Efek animasi sederhana saat scroll (Opsional) ---
function revealOnScroll() {
    const sections = document.querySelectorAll('section'); // Target semua section

    const options = {
        root: null, // relative to the viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            } else {
                 // Opsional: Sembunyikan lagi saat keluar viewport
                 entry.target.style.opacity = "0";
                 entry.target.style.transform = "translateY(20px)";
            }
        });
    }, options);

    sections.forEach(section => {
         // Atur style awal sebelum animasi
         section.style.opacity = "0";
         section.style.transform = "translateY(20px)";
         section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
         observer.observe(section);
    });

    // Untuk elemen lain seperti feature items (jika ingin animasi terpisah)
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        // Tambahkan delay agar muncul satu per satu
        item.style.transition = opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s;
        observer.observe(item); // Gunakan observer yang sama atau buat baru
    });


}

// Panggil fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    getCurrentYear();
    smoothScroll();
    revealOnScroll(); // Panggil fungsi animasi scroll

    // Contoh interaksi lain: Alert saat tombol CTA utama diklik
    const mainCtaButton = document.querySelector('.hero-section .cta-button');
    if(mainCtaButton) {
        mainCtaButton.addEventListener('click', (e) => {
            // Hapus preventDefault jika tombol ini adalah link #cta
            // e.preventDefault();
            // alert('Anda akan diarahkan untuk memesan!');
            // Biarkan scroll halus bekerja jika itu link #cta
        });
    }
});