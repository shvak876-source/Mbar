const header = document.querySelector('.header');
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

document.getElementById('year').textContent = new Date().getFullYear();

const waFloat = document.querySelector('.wa-float');
const dock = document.querySelector('.dock');
const onScroll = () => {
  header.classList.toggle('header--scrolled', window.scrollY > 40);
  // The hero has its own call to action; the floating WhatsApp button joins once past it
  const past = window.scrollY >= window.innerHeight * 0.6;
  waFloat.classList.toggle('wa-float--hidden', !past);
  dock.classList.toggle('dock--hidden', !past);
};
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
const stockLink = (item, color, size) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`היי, אשמח לבדוק אם יש במלאי:\n${item.name}\nצבע: ${color}\nמידה: ${size}\nתודה!`)}`;
const grid = document.getElementById('catalogGrid');
const filters = document.getElementById('filters');
const usedCategories = Object.keys(CATEGORIES).filter(key => PRODUCTS.some(p => p.category === key));

const WA_ICON = '<svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm6 15.5c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.7-.4z"/></svg>';
const count = document.getElementById('catalogCount');

const PAGE = 12;
// Cards rise in as they reach the viewport; two columns on phones, so the stagger alternates
const cardObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('product--in'); cardObserver.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
const more = document.getElementById('catalogMore');
let items = [], shown = 0;

const showMore = () => {
  items.slice(shown, shown + PAGE).forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <div class="product__media">
        <button class="product__zoom" type="button" aria-label="הגדלה: ${item.name}">
          <img src="${item.image}" alt="${item.name}" width="600" height="800" loading="lazy">
        </button>
        ${item.isNew ? '<span class="product__badge">NEW</span>' : ''}
        <button class="product__quick" type="button">${WA_ICON}<span>בחירת מידה וצבע</span></button>
      </div>
      <div class="product__body">
        <h3>${item.name}</h3>
        <p class="product__meta">${item.price || CATEGORIES[item.category] || ''}</p>
      </div>`;
    // The whole card opens the item sheet; the zoom button keeps it reachable by keyboard
    card.addEventListener('click', e => { openLightbox(item); });
    card.style.setProperty('--d', `${(i % 2) * 70}ms`);
    grid.appendChild(card);
    cardObserver.observe(card);
  });
  shown = Math.min(shown + PAGE, items.length);
  more.hidden = shown >= items.length;
  more.textContent = `הצגת עוד פריטים (${items.length - shown})`;
};

const renderCatalog = category => {
  items = PRODUCTS.filter(p => category === 'all' || p.category === category);
  shown = 0;
  count.textContent = `${items.length} פריטים`;
  grid.innerHTML = items.length ? '' : '<p class="catalog__empty">עוד אין פריטים בקטגוריה הזו – שלחו לנו הודעה ונעדכן.</p>';
  showMore();
};
more.addEventListener('click', showMore);

[['all', 'הכל'], ...usedCategories.map(key => [key, CATEGORIES[key]])].forEach(([key, label], i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'filter';
  btn.setAttribute('aria-pressed', i === 0);
  btn.textContent = label;
  btn.addEventListener('click', () => {
    filters.querySelectorAll('.filter').forEach(b => b.setAttribute('aria-pressed', b === btn));
    btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    renderCatalog(key);
    // Coming from deep in a long list: jump back to the first item of the new category
    if (grid.getBoundingClientRect().top < 0) grid.scrollIntoView({ behavior: 'smooth' });
  });
  filters.appendChild(btn);
});
renderCatalog('all');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
let lastFocus = null;
const orderBtn = document.getElementById('lightboxOrder');
const hint = document.getElementById('lightboxHint');
const colorsEl = document.getElementById('lightboxColors');
const sizesEl = document.getElementById('lightboxSizes');
const colorName = document.getElementById('lightboxColorName');
const sizeName = document.getElementById('lightboxSizeName');
let current = null, chosenColor = null, chosenSize = null;

const renderChart = category => {
  const chart = SIZE_CHARTS[CHART_BY_CATEGORY[category]];
  document.getElementById('sizeChart').innerHTML = `<table><thead><tr>${chart.head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${chart.rows.map(r => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map(c => `<td><span dir="ltr">${c}</span></td>`).join('')}</tr>`).join('')}</tbody></table><p class="sizechart__note">הטבלה כללית ויכולה להשתנות מעט בין דגמים. בין שתי מידות? שאלו אותנו בוואטסאפ.</p>`;
};

const refreshOrder = () => {
  colorName.textContent = chosenColor || 'לא נבחר';
  sizeName.textContent = chosenSize || 'לא נבחרה';
  const ready = chosenColor && chosenSize;
  orderBtn.setAttribute('aria-disabled', !ready);
  if (ready) {
    orderBtn.href = stockLink(current, chosenColor, chosenSize);
    hint.textContent = '';
  } else {
    orderBtn.removeAttribute('href');
    hint.textContent = !chosenSize && !chosenColor ? 'בחרו מידה וצבע כדי לבדוק מלאי' : !chosenSize ? 'בחרו מידה כדי לבדוק מלאי' : 'בחרו צבע כדי לבדוק מלאי';
  }
};

const buildOptions = (container, values, getLabel, onPick, isColor) => {
  container.innerHTML = '';
  values.forEach(value => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = isColor ? 'swatch' : 'size';
    b.setAttribute('aria-pressed', false);
    if (isColor) {
      b.setAttribute('aria-label', value);
      b.title = value;
      b.innerHTML = `<span style="background:${COLOR_SWATCHES[value] || '#999'}"></span>`;
    } else {
      b.textContent = value;
    }
    b.addEventListener('click', () => {
      container.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      onPick(value);
      refreshOrder();
    });
    container.appendChild(b);
  });
};

const openLightbox = item => {
  lastFocus = document.activeElement;
  current = item;
  chosenSize = null;
  chosenColor = item.colors.length === 1 ? item.colors[0] : null;
  document.getElementById('lightboxImg').src = item.image;
  document.getElementById('lightboxImg').alt = item.name;
  document.getElementById('lightboxTitle').textContent = item.name;
  document.getElementById('lightboxPrice').textContent = item.price || CATEGORIES[item.category] || '';
  buildOptions(colorsEl, item.colors, null, v => { chosenColor = v; }, true);
  if (chosenColor) colorsEl.firstChild.setAttribute('aria-pressed', true);
  buildOptions(sizesEl, item.sizes || SIZES[item.category], null, v => { chosenSize = v; }, false);
  renderChart(item.category);
  document.querySelector('.sizechart').open = false;
  refreshOrder();
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
  lightboxClose.focus();
};
orderBtn.addEventListener('click', e => {
  if (orderBtn.getAttribute('aria-disabled') === 'true') { e.preventDefault(); hint.textContent = 'כדי לבדוק מלאי צריך לבחור מידה וצבע'; }
});
const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.classList.remove('no-scroll');
  if (lastFocus) lastFocus.focus();
};
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  // Keep Tab focus inside the dialog
  if (e.key === 'Tab') {
    const focusable = [...lightbox.querySelectorAll('button, a[href]')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

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

// Google Maps loads only when asked for, so nothing reaches Google before the visitor chooses it
const mapButton = document.querySelector('.map-load');
mapButton.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'מפה – MBAR, תל חי 100 קריית שמונה';
  frame.src = mapButton.dataset.src;
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  mapButton.replaceWith(frame);
  frame.focus();
});
