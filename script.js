const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
if (menu && mobileNav) {
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation'); mobileNav.hidden = open; });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); }));
}
const dialog = document.querySelector('#video-dialog');
if (dialog) {
  document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.video;
    document.querySelector('#video-title').textContent = button.dataset.title;
    const iframe = document.createElement('iframe'); iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`; iframe.title = button.dataset.title; iframe.allow = 'autoplay; encrypted-media; picture-in-picture'; iframe.allowFullscreen = true;
    document.querySelector('#video-container').replaceChildren(iframe);
    document.querySelector('#youtube-link').href = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  document.querySelector('.close-video').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.querySelector('#video-container').replaceChildren(); document.body.style.overflow = ''; });
}
const year = document.querySelector('#year'); if(year) year.textContent = new Date().getFullYear();
// Preserve campaign attribution when the visitor continues to the booking page.
const campaign = new URLSearchParams(location.search);
const allowed = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'];
document.querySelectorAll('a[href="apply.html"]').forEach(a => { const url = new URL(a.href); allowed.forEach(key => { if(campaign.has(key)) url.searchParams.set(key,campaign.get(key)); }); a.href = url.href; });
const booking = document.querySelector('#booking-link');
if(booking){ const url = new URL(booking.href); allowed.forEach(key => { if(campaign.has(key)) url.searchParams.set(key,campaign.get(key)); }); booking.href = url.href; }
const search = document.querySelector('#video-search');
const category = document.querySelector('#video-category');
if(search && category){
  const filterVideos = () => {
    let count = 0; const query = search.value.trim().toLowerCase();
    document.querySelectorAll('.resource-card').forEach(card => { const match = (category.value === 'All videos' || card.dataset.category === category.value) && (card.dataset.search.includes(query) || card.dataset.category.toLowerCase().includes(query)); card.hidden = !match; if(match) count++; });
    document.querySelector('#result-count').textContent = `${count} video${count === 1 ? '' : 's'}`;
    document.querySelector('#no-results').hidden = count !== 0;
  };
  search.addEventListener('input',filterVideos); category.addEventListener('change',filterVideos);
}
