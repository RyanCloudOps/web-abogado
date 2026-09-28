(function () {
  const C = window.SITE_CONFIG;

  // ---------- Datos de contacto ----------
  const waBase = `https://wa.me/${C.whatsapp}`;
  document.querySelectorAll("[data-tel]").forEach(a => (a.href = `tel:${C.phone}`));
  document.querySelectorAll("[data-wa]").forEach(a => (a.href = `${waBase}?text=${encodeURIComponent("Hola, quisiera realizar una consulta legal.")}`));
  document.querySelectorAll("[data-mail]").forEach(a => (a.href = `mailto:${C.email}`));
  document.querySelectorAll("[data-phone-text]").forEach(el => (el.textContent = C.phoneDisplay));
  document.querySelectorAll("[data-wa-text]").forEach(el => (el.textContent = C.phoneDisplay));
  document.querySelectorAll("[data-mail-text]").forEach(el => (el.textContent = C.email));
  document.querySelectorAll("[data-address]").forEach(el => (el.textContent = C.address));
  document.querySelectorAll("[data-hours]").forEach(el => (el.textContent = C.hoursText));
  document.querySelectorAll("[data-legal-name]").forEach(el => (el.textContent = C.legalName));
  document.querySelectorAll("[data-registration]").forEach(el => (el.textContent = C.registration));
  const mapFrame = document.getElementById("mapFrame");
  if (mapFrame) mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&z=15&output=embed`;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Datos estructurados (Google) ----------
  if (document.body.dataset.page === "home") {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Amilcar Etzel · Abogado",
      url: `${C.siteUrl}/`,
      image: `${C.siteUrl}/assets/img/og-image.jpg`,
      description: "Asesoría y defensa legal en Derecho Constitucional, Penal, Civil, Familiar, Laboral y Administrativo en Chuquisaca, Bolivia.",
      telephone: C.phone,
      email: C.email,
      address: { "@type": "PostalAddress", streetAddress: C.address, addressLocality: "Sucre", addressRegion: "Chuquisaca", addressCountry: "BO" },
      areaServed: { "@type": "AdministrativeArea", name: "Chuquisaca, Bolivia" },
      knowsLanguage: "es",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:30"
      },
      founder: { "@type": "Person", name: C.legalName, jobTitle: "Abogado" }
    });
    document.head.appendChild(ld);
  }

  // ---------- Analítica (Vercel Web Analytics, sin cookies) ----------
  if (C.vercelAnalytics) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    const va = document.createElement("script");
    va.defer = true;
    va.src = "/_vercel/insights/script.js";
    document.head.appendChild(va);
  }

  // ---------- Header y menú móvil ----------
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("header--scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", open);
    document.body.classList.toggle("no-scroll", open);
  });
  if (nav) nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }));

  // ---------- Animación de aparición ----------
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // ---------- Reservas ----------
  const form = document.getElementById("bookingForm");
  if (!form) return;
  const fecha = form.fecha;
  const hora = form.hora;
  const errorEl = document.getElementById("formError");

  const pad = n => String(n).padStart(2, "0");
  const toISODate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  // Primer día hábil disponible (desde mañana)
  const firstDay = new Date();
  firstDay.setDate(firstDay.getDate() + 1);
  while (!C.bookingDays.includes(firstDay.getDay())) firstDay.setDate(firstDay.getDate() + 1);
  fecha.min = toISODate(firstDay);
  fecha.value = toISODate(firstDay);

  hora.innerHTML = C.bookingSlots.map(s => `<option value="${s}">${s}</option>`).join("");

  const showError = msg => { errorEl.textContent = msg; errorEl.hidden = !msg; };

  form.addEventListener("submit", e => {
    e.preventDefault();
    showError("");
    const data = Object.fromEntries(new FormData(form));

    if (!data.nombre.trim() || !data.telefono.trim() || !data.area || !data.fecha) {
      showError("Por favor complete nombre, teléfono, área legal y fecha.");
      return;
    }
    const [y, m, d] = data.fecha.split("-").map(Number);
    const day = new Date(y, m - 1, d);
    if (!C.bookingDays.includes(day.getDay())) {
      showError("La fecha elegida no es un día de atención. Elija de lunes a viernes.");
      return;
    }

    const fechaLarga = day.toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const msg =
      `*Solicitud de consulta legal*\n\n` +
      `*Nombre:* ${data.nombre.trim()}\n` +
      `*Teléfono:* ${data.telefono.trim()}\n` +
      `*Área:* ${data.area}\n` +
      `*Modalidad:* ${data.modalidad}\n` +
      `*Fecha:* ${fechaLarga}\n` +
      `*Hora:* ${data.hora}\n` +
      (data.mensaje.trim() ? `*Caso:* ${data.mensaje.trim()}\n` : "");

    const waUrl = `${waBase}?text=${encodeURIComponent(msg)}`;

    // Enlace para añadir la cita a Google Calendar
    const [hh, mm] = data.hora.split(":").map(Number);
    const start = new Date(y, m - 1, d, hh, mm);
    const end = new Date(start.getTime() + C.appointmentMinutes * 60000);
    const fmt = t => `${t.getFullYear()}${pad(t.getMonth() + 1)}${pad(t.getDate())}T${pad(t.getHours())}${pad(t.getMinutes())}00`;
    const gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(`Consulta legal – ${data.area} (Abg. Amilcar Etzel)`)}` +
      `&dates=${fmt(start)}/${fmt(end)}` +
      `&ctz=${encodeURIComponent(C.timezone)}` +
      `&details=${encodeURIComponent(msg.replace(/\*/g, ""))}` +
      `&location=${encodeURIComponent(data.modalidad === "Videollamada" ? "Videollamada" : C.address)}`;

    document.getElementById("waRetry").href = waUrl;
    document.getElementById("gcalLink").href = gcal;
    document.getElementById("bookingDone").hidden = false;
    window.open(waUrl, "_blank", "noopener");
  });
})();
