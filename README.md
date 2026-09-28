# Amilcar Etzel · Abogado — Sitio web

Sitio web profesional del abogado **Amilcar Etzel**, con despacho en **Chuquisaca, Bolivia**. Especializado en
**Derecho Constitucional**, con práctica en las áreas Penal, Civil, Familiar, Laboral y Administrativa.

El objetivo de la página es presentar sus servicios y facilitar que los clientes lo contacten o reserven una consulta.

## Secciones

- **Inicio** — presentación, botón de reserva y botón de llamada.
- **Áreas de práctica** — Constitucional, Penal, Civil, Familiar, Laboral y Administrativo.
- **Derecho Constitucional** — acciones de defensa de la CPE: Acción de Libertad, Amparo Constitucional,
  Protección de Privacidad, Cumplimiento, Acción Popular e Inconstitucionalidad.
- **Sobre mí** — perfil y valores.
- **Cómo trabajo** — proceso en 4 pasos.
- **Reservas** — formulario que envía la solicitud por **WhatsApp** y ofrece añadir la cita a **Google Calendar**.
- **Preguntas frecuentes** y **Contacto** (teléfono, WhatsApp, correo, dirección y mapa).
- Botones flotantes de **llamada** y **WhatsApp**.

## Tecnologías

- **HTML5, CSS3 y JavaScript** puro (sin frameworks ni dependencias de compilación).
- **Google Fonts**: Cormorant Garamond y Montserrat.
- **Google Maps** (iframe) para la ubicación.
- Enlaces `wa.me` (WhatsApp) y plantillas de evento de **Google Calendar** para las reservas.
- Imágenes en formato **WebP**; diseño responsive (móvil, tablet y escritorio).

## Estructura

```
index.html        Página principal
aviso-legal.html  Aviso legal
privacidad.html   Política de privacidad y cookies
404.html          Página de error personalizada
robots.txt        Instrucciones para buscadores
sitemap.xml       Mapa del sitio para Google
styles.css        Estilos (paleta azul marino y dorado)
script.js         Menú, animaciones y lógica de reservas
config.js         Datos de contacto y horarios  ← editar aquí
assets/img/       Fotos, fondo y favicon
```

## Configuración

Todos los datos de contacto están en **`config.js`**: teléfono, WhatsApp, correo, dirección, texto del mapa,
horario de atención, días y horas disponibles para reservar y zona horaria (`America/La_Paz`).

> ⚠️ Los valores actuales son de ejemplo y deben reemplazarse por los reales antes de publicar.

## Ver en local

```bash
python -m http.server 5510
```

Y abrir <http://localhost:5510>.

## Próximos pasos

- [ ] Completar los datos de contacto reales y la matrícula del Registro Público de la Abogacía en `config.js`.
- [ ] Que el abogado revise el Aviso legal y la Política de privacidad.
- [ ] Al tener el dominio definitivo, cambiar la URL en `config.js`, `index.html` (canonical/og), las páginas legales, `robots.txt` y `sitemap.xml`.
- [ ] Desplegar en Vercel y conectar un dominio propio (`.com` o `.bo`).
- [ ] Automatizar las reservas con el Google Calendar del despacho (Cal.com o Google Apps Script).
- [ ] Registrar el sitio en Google Search Console y crear el perfil de Google Business.
