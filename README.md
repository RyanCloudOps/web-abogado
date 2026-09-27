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
- `tools/retoque_fotos.py` — script en Python + Pillow para el retoque suave de fotos.

## Estructura

```
index.html        Página principal
styles.css        Estilos (paleta azul marino y dorado)
script.js         Menú, animaciones y lógica de reservas
config.js         Datos de contacto y horarios  ← editar aquí
assets/img/       Fotos, fondo y favicon
tools/            Utilidades (retoque de fotos)
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

- [ ] Completar los datos de contacto reales en `config.js`.
- [ ] Desplegar en Vercel y conectar un dominio propio (`.com` o `.bo`).
- [ ] Automatizar las reservas con el Google Calendar del despacho (Cal.com o Google Apps Script).
- [ ] Registrar el sitio en Google Search Console y crear el perfil de Google Business.
