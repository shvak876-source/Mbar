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
