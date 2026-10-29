'use strict';
const form = document.querySelector('#subscribe-form');
const emailInput = document.querySelector('#email');
const result = document.querySelector('#form-result');
const recipient = 'lucialbiach@gmail.com';
let requestText = '';
form.addEventListener('submit', (event) => {
  event.preventDefault();
  emailInput.value = emailInput.value.trim();
  if (!form.reportValidity()) return;
  const email = emailInput.value;
  const subject = 'Solicitud de alta · Lecturas de Ghibli';
  const body = `Hola:\n\nQuiero suscribirme a los avisos de Lecturas de Ghibli en esta dirección: ${email}\n\nAcepto el uso de mi correo para recibir una selección de avisos sobre libros y ediciones en español que se incorporen al catálogo internacional de Studio Ghibli. He leído la información de privacidad de la landing y sé que puedo pedir la baja escribiendo a ${recipient}.\n\nPor favor, confirmadme cuando se gestione mi alta.\n\nGracias.`;
  requestText = `Para: ${recipient}\nAsunto: ${subject}\n\n${body}`;
  document.querySelector('#gmail-link').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  result.hidden = false;
  result.focus({ preventScroll: true });
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
emailInput.addEventListener('input', () => { result.hidden = true; });
document.querySelector('#consent').addEventListener('change', () => { result.hidden = true; });
document.querySelector('#copy-request').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(requestText);
    button.textContent = 'Solicitud copiada';
  } catch {
    const text = document.createElement('textarea');
    text.value = requestText;
    text.setAttribute('aria-label', 'Solicitud para copiar y enviar por correo');
    text.style.cssText = 'width:100%;min-height:200px;margin-top:12px';
    result.appendChild(text);
    text.focus();
    text.select();
    button.textContent = 'Selecciona y copia el texto';
  }
});
function openLegalSection() {
  const section = document.getElementById(window.location.hash.slice(1));
  if (section && section.tagName === 'DETAILS') { section.open = true; section.scrollIntoView({ block: 'start' }); }
}
window.addEventListener('hashchange', openLegalSection);
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  const target = document.getElementById(link.getAttribute('href').slice(1));
  if (target?.tagName === 'DETAILS') target.open = true;
}));
openLegalSection();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('ready'); observer.observe(el); });
}

