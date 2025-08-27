const EMAILJS_SERVICE_ID  = "service_08nz50c";
const EMAILJS_TEMPLATE_ID = "template_1tg7o78";

const form     = document.getElementById("interestForm");
const btn      = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");

function sanitize(s){ return (s || "").replace(/[<>]/g, ""); }

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if ((document.getElementById("website").value || "").trim() !== "") return; // Honeypot

  const institution = sanitize(document.getElementById("institution").value);
  const name        = sanitize(document.getElementById("name").value);
  const email       = sanitize(document.getElementById("email").value);

  if (!institution || !name || !email){
    statusEl.textContent = "Bitte fülle alle Pflichtfelder aus.";
    return;
  }

  btn.disabled = true;
  statusEl.textContent = "Sende …";

  try{
    const payload = {
      // Empfängeradresse für „To Email“
      to_email: email,
      to_name:  name,       // optional, falls im Template verwendet
      reply_to: email,      // optional: setzt Reply-To

      // Inhalte für den Mailtext
      institution,
      name,
      email,

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
