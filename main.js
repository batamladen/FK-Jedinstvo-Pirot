/* =============================================
   FK JEDINSTVO PIROT — MAIN JS
   ============================================= */

// NAV SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// MOBILE MENU
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// MATCHES TABS
function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.remove('hidden');
  event.target.classList.add('active');
}

// NEWS / GALLERY FILTER BUTTONS (filter-btn click)
document.querySelectorAll('.news-filter .filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.news-filter .filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // Would filter articles by data-cat in a real CMS implementation
  });
});

// GALLERY FILTER
function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// LIGHTBOX
const galleryImages = [];
let currentIndex = 0;

function buildGalleryData() {
  document.querySelectorAll('.gal-item').forEach(item => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.gal-overlay span');
    galleryImages.push({
      src: img ? img.src : '',
      caption: cap ? cap.textContent : ''
    });
  });
}

function openLightbox(index) {
  if (!galleryImages.length) buildGalleryData();
  currentIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  if (!lb || !img) return;
  img.src = galleryImages[currentIndex].src;
  cap.textContent = galleryImages[currentIndex].caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function changePhoto(dir) {
  if (!galleryImages.length) return;
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  img.src = galleryImages[currentIndex].src;
  cap.textContent = galleryImages[currentIndex].caption;
}

// KEYBOARD NAVIGATION
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') changePhoto(1);
  if (e.key === 'ArrowLeft') changePhoto(-1);
});

// SCROLL REVEAL (simple CSS-class based)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.news-card, .player-card, .full-player-card, .match-row, .gal-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});




/* =============================================
   FK JEDINSTVO PIROT — FILTRIRANJE VESTI
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".news-card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      // Active dugme
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;

        if (filter === "sve" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

    });
  });

});