const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const themeButton = document.querySelector('.theme-toggle');

function setTheme(theme) {
  document.body.dataset.theme = theme;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  themeButton.title = `Switch to ${nextTheme} theme`;
  themeButton.querySelector('span').textContent = theme === 'dark' ? '☼' : '☾';
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
}

let savedTheme = 'light';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'light'; } catch {}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
});
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

// Stable illustrative contribution pattern, so the page has no third-party API dependency.
const grid = document.querySelector('.contrib-grid');
let seed = 293;
for (let i = 0; i < 364; i++) {
  seed = (seed * 9301 + 49297) % 233280;
  const level = seed / 233280;
  const cell = document.createElement('span');
  if (level > .9) cell.style.background = '#c1db7d';
  else if (level > .77) cell.style.background = '#91b46a';
  else if (level > .61) cell.style.background = '#57834e';
  else if (level > .47) cell.style.background = '#34563b';
  grid.append(cell);
}

const contactDialog = document.querySelector('#contact-dialog');
const contactForm = document.querySelector('#contact-form');
const formView = document.querySelector('#contact-form-view');
const contactSuccess = document.querySelector('#contact-success');
const formStatus = document.querySelector('#form-status');
const submitButton = contactForm.querySelector('[type="submit"]');

document.querySelector('#open-contact-form').addEventListener('click', () => {
  formView.hidden = false;
  contactSuccess.hidden = true;
  formStatus.textContent = '';
  contactDialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => contactDialog.close());
document.querySelector('#success-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('close', () => {
  if (!contactSuccess.hidden) contactForm.reset();
});
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  formStatus.textContent = 'Sending your message…';
  submitButton.disabled = true;
  try {
    const fields = Object.fromEntries(new FormData(contactForm).entries());
    const response = await fetch('https://formsubmit.co/ajax/buggu7439@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(fields)
    });
    const result = await response.json();
    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error(result.message || 'The message could not be sent.');
    }
    formView.hidden = true;
    contactSuccess.hidden = false;
  } catch (error) {
    formStatus.textContent = 'Sorry, the message could not be sent. Please try again or email buggu7439@gmail.com.';
  } finally {
    submitButton.disabled = false;
  }
});

