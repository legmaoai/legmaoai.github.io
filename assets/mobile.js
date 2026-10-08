/* Native language selection for touch browsers; existing page translators remain authoritative. */
(() => {
  'use strict';
  const picker = document.querySelector('.nav .lang');
  if (!picker) return;
  const links = [...picker.querySelectorAll('[data-lang]')];
  if (!links.length) return;
  const select = document.createElement('select');
  select.className = 'mobileLanguage';
  select.setAttribute('aria-label', 'Language / 语言');
  links.forEach(link => {
    const option = document.createElement('option');
    option.value = link.dataset.lang;
    option.textContent = link.textContent.trim();
    select.append(option);
  });
  picker.before(select);
  picker.parentElement.classList.add('mobile-language-ready');
  const sync = () => {
    select.value = document.documentElement.lang;
    select.setAttribute('lang', document.documentElement.lang);
  };
  select.addEventListener('change', () => {
    const link = links.find(item => item.dataset.lang === select.value);
    if (link) link.click();
    picker.open = false;
    document.querySelectorAll('.navlinks.is-open,.navlinks.open').forEach(nav => nav.classList.remove('is-open','open'));
    document.querySelectorAll('.menuToggle').forEach(button => button.setAttribute('aria-expanded', 'false'));
    sync();
  });
  document.querySelector('.menuToggle')?.addEventListener('click', () => { picker.open = false; });
  picker.querySelector('summary')?.addEventListener('click', () => {
    document.querySelectorAll('.navlinks.is-open,.navlinks.open').forEach(nav => nav.classList.remove('is-open','open'));
    document.querySelectorAll('.menuToggle').forEach(button => button.setAttribute('aria-expanded', 'false'));
  });
  new MutationObserver(sync).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  sync();
})();
