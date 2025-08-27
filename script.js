// EmailJS IDs (deine)
const EMAILJS_SERVICE_ID  = "service_08nz50c";
const EMAILJS_TEMPLATE_ID = "template_1tg7o78";
// Public Key ist im <head> gesetzt.

const form     = document.getElementById("interestForm");
const btn      = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");

function sanitize(s){ return (s || "").replace(/[<>]/g, ""); }

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Honeypot
  if ((document.getElementById("website").value || "").trim() !== "") return;

  const institution = sanitize(document.getElementById("institution").value);
  const name        = sanitize(document.getElementById("name").value);
  const email       = sanitize(document.getElementById("email").value);

  if (!institution){
    statusEl.textContent = "Bitte gib den Namen der Einrichtung an.";
    return;
  }

  btn.disabled = true;
  statusEl.textContent = "Sende …";

  try{
    const payload = {
      institution,
      name:  name  || "(kein Name angegeben)",
      email: email || "(keine E-Mail angegeben)",
      source_url: window.location.href,
      timestamp: new Date().toISOString()
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
    statusEl.textContent = "Danke! Deine Interessensmeldung wurde gesendet.";
    form.reset();
  } catch (err){
    console.error(err);
    statusEl.textContent = "Leider ein Fehler beim Senden. Bitte später erneut versuchen.";
  } finally {
    btn.disabled = false;
  }
});
