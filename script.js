// 👉 Ersetze durch deine EmailJS Daten
const EMAILJS_SERVICE_ID  = "service_08nz50c";
const EMAILJS_TEMPLATE_ID = "template_1tg7o78";
// publicKey wird bereits im <head> gesetzt

const form     = document.getElementById("interestForm");
const btn      = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");

function sanitize(s) {
  if (!s) return "";
  return s.replace(/[<>]/g, "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Honeypot
  if (document.getElementById("website").value.trim() !== "") return;

  const name  = sanitize(document.getElementById("name").value);
  const email = sanitize(document.getElementById("email").value);

  btn.disabled = true;
  statusEl.textContent = "Sende Nachricht …";

  try {
    const payload = {
      name: name || "(kein Name angegeben)",
      email: email || "(keine E-Mail angegeben)",
      source_url: window.location.href,
      timestamp: new Date().toISOString()
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);

    statusEl.textContent = "Danke! Deine Interessensmeldung wurde gesendet.";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Fehler beim Senden. Bitte versuche es später erneut.";
  } finally {
    btn.disabled = false;
  }
});
