const header = document.querySelector('.header');
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

document.getElementById('year').textContent = new Date().getFullYear();

const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
  toggle.classList.toggle('menu-toggle--open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('no-scroll', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('nav--open');
  toggle.classList.remove('menu-toggle--open');
  toggle.setAttribute('aria-expanded', false);
  document.body.classList.remove('no-scroll');
}));

// Catalog
const WHATSAPP = '972527566533';
const orderLink = item => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`היי, אשמח לפרטים על: ${item.name}`)}`;
const grid = document.getElementById('catalogGrid');
const filters = document.getElementById('filters');
const usedCategories = Object.keys(CATEGORIES).filter(key => PRODUCTS.some(p => p.category === key));

const renderCatalog = category => {
  grid.innerHTML = '';
  PRODUCTS.filter(p => category === 'all' || p.category === category).forEach(item => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <button class="product__media" type="button" aria-label="הגדלה">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </button>
      <div class="product__body">
        <span class="product__cat">${CATEGORIES[item.category] || ''}</span>
        <h3>${item.name}</h3>
        ${item.price ? `<p class="product__price">${item.price}</p>` : ''}
        <a class="product__order" href="${orderLink(item)}" target="_blank" rel="noopener">להזמנה ←</a>
      </div>`;
    card.querySelector('.product__media').addEventListener('click', () => openLightbox(item));
    grid.appendChild(card);
  });
};

[['all', 'הכל'], ...usedCategories.map(key => [key, CATEGORIES[key]])].forEach(([key, label], i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'filter' + (i === 0 ? ' filter--active' : '');
  btn.textContent = label;
  btn.addEventListener('click', () => {
    filters.querySelectorAll('.filter').forEach(b => b.classList.remove('filter--active'));
    btn.classList.add('filter--active');
    renderCatalog(key);
  });
  filters.appendChild(btn);
});
renderCatalog('all');

// Lightbox
const lightbox = document.getElementById('lightbox');
const openLightbox = item => {
  document.getElementById('lightboxImg').src = item.image;
  document.getElementById('lightboxImg').alt = item.name;
  document.getElementById('lightboxTitle').textContent = item.name;
  document.getElementById('lightboxPrice').textContent = item.price || '';
  document.getElementById('lightboxOrder').href = orderLink(item);
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
};
const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.classList.remove('no-scroll');
};
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

// Fade sections in as they scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
