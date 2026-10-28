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

const WA_ICON = '<svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm6 15.5c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.7-.4z"/></svg>';
const count = document.getElementById('catalogCount');

const renderCatalog = category => {
  const items = PRODUCTS.filter(p => category === 'all' || p.category === category);
  count.textContent = `${items.length} פריטים`;
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <div class="product__media">
        <button class="product__zoom" type="button" aria-label="הגדלה: ${item.name}">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </button>
        ${item.isNew ? '<span class="product__badge">NEW</span>' : ''}
        <a class="product__quick" href="${orderLink(item)}" target="_blank" rel="noopener">${WA_ICON}<span>להזמנה בוואטסאפ</span></a>
      </div>
      <div class="product__body">
        <h3>${item.name}</h3>
        <p class="product__meta">${item.price || CATEGORIES[item.category] || ''}</p>
      </div>`;
    card.querySelector('.product__zoom').addEventListener('click', () => openLightbox(item));
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
