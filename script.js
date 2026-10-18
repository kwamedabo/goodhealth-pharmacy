/*
  BEFORE PUBLISHING:
  1. Replace the example values below with GoodHealth Pharmacy's real details.
  2. This contact form uses the visitor's email app (mailto). For a form that sends messages directly, connect a form service.
*/
const PHARMACY = {
  email: "",       // Example: info@goodhealthpharmacy.com
  phone: "",       // International format, digits only. Example: 233XXXXXXXXX
  address: ""      // Example: Accra, Ghana
};

document.getElementById("year").textContent = new Date().getFullYear();
const emailDisplay = document.getElementById("emailDisplay");
const phoneDisplay = document.getElementById("phoneDisplay");
const addressDisplay = document.getElementById("addressDisplay");

if (PHARMACY.email) {
  emailDisplay.innerHTML = "";
  const a = document.createElement("a"); a.href = `mailto:${PHARMACY.email}`; a.textContent = PHARMACY.email;
  emailDisplay.appendChild(a);
}
if (PHARMACY.phone) {
  phoneDisplay.innerHTML = "";
  const a = document.createElement("a"); a.href = `https://wa.me/${PHARMACY.phone.replace(/\\D/g, "")}`; a.target = "_blank"; a.rel = "noopener"; a.textContent = "+" + PHARMACY.phone.replace(/\\D/g, "");
  phoneDisplay.appendChild(a);
}
if (PHARMACY.address) addressDisplay.textContent = PHARMACY.address;

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰";
}));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const status = document.getElementById("formStatus");
  if (!PHARMACY.email) {
    status.textContent = "Please add your pharmacy email address in script.js before publishing so enquiries can be sent.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`GoodHealth Pharmacy enquiry: ${data.get("topic")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nReply email: ${data.get("email") || "Not provided"}\nTopic: ${data.get("topic")}\n\nMessage:\n${data.get("message")}\n\nPlease do not reply with sensitive medical information.`);
  window.location.href = `mailto:${PHARMACY.email}?subject=${subject}&body=${body}`;
  status.textContent = "Your email app should open with the enquiry ready to send.";
});
