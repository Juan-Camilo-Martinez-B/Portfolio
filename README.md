# Portafolio – Juan Camilo Martínez

Un portafolio moderno, accesible y de alto rendimiento construido con Next.js 15, TypeScript y Tailwind CSS. Incluye animaciones WebGL, dark/light/system theme con transiciones suaves, i18n (ES/EN), y una arquitectura limpia basada en componentes y datos centralizados.

## ✨ Lo más destacado

- UI responsiva con diseño Mobile-first
- Animaciones: fondo de rayos con WebGL y efecto de cursor en Canvas
- Cambio de tema con transiciones (View Transitions API si está disponible; fallback CSS)
- i18n completo (ES/EN) desde archivos JSON
- Navegación suave por secciones y Sidebar contextual
- Modales con comportamiento diferenciado para desktop/mobile
- Código estabilizado para mobile (sin hover “pegado” en navbar)

## 🧱 Arquitectura y secciones

```
src/
├── app/
│   ├── globals.css         # Estilos globales, variables y reglas táctiles
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal y orquestación de secciones
├── components/
│   ├── ui/                 # Componentes base (Button, Card, Section)
│   ├── Hero.tsx            # Presentación inicial (avatar + CTA CV)
│   ├── AboutMe.tsx         # Sobre mí (texto + botón “Entra en mi mundo”)
│   ├── Projects.tsx        # Proyectos con previsualizaciones e iconos
│   ├── Skills.tsx          # Carruseles de skills con animación continua
│   ├── Education.tsx       # Formación y crecimiento (académico/aprendizaje)
│   ├── Contact.tsx         # Contacto con EmailJS
│   ├── Navbar.tsx          # Barra inferior (sin estado activo por scroll)
│   ├── Sidebar.tsx         # Mensajes contextuales por sección
│   ├── DynamicModal.tsx    # Modal “Entra en mi mundo”
│   ├── ProjectDetailsModal.tsx # Detalles de proyecto (sidebar en desktop)
│   ├── CursorEffect.tsx    # Estela del cursor (Canvas)
│   └── StormBackground.tsx # Fondo de rayos (WebGL)
├── contexts/
│   ├── ThemeContext.tsx    # Tema: light/dark/system con transiciones
│   └── LanguageContext.tsx # Idioma: es/en
├── data/
│   ├── portfolio.json      # Contenido ES (navegación, textos, educación, etc.)
│   └── portfolio.en.json   # Contenido EN
├── hooks/
│   ├── usePortfolioData.ts # Capa de acceso a datos centralizados
│   ├── useResponsiveIntersectionObserver.ts # Detección de sección visible
│   ├── useMobileScrollDetection.ts # Respaldo para móviles
│   └── useScrollToSection.ts / useIntersectionObserver.ts (helpers)
├── lib/
│   └── utils.ts            # utilidades (scroll suave, helpers)
└── constants/
    └── index.ts            # Constantes del sistema
```

## 🧭 Comportamiento de navegación

- El Sidebar se actualiza automáticamente según la sección visible (IntersectionObserver + respaldo en móviles).
- El Navbar NO cambia su estado activo automáticamente (se acordó dejarlo solo como navegación directa). En desktop conserva hover; en mobile no deja hover “pegado”.
- En mobile, los toques sobre botones quitan inmediatamente el foco/hover (handlers con `blur()` seguros).

## 🌙 Temas (light/dark/system)

- Se usa `ThemeContext`. El modo “system” respeta `prefers-color-scheme`.
- Transición suave al cambiar de tema: View Transitions API si el navegador la soporta; fallback CSS con `html.theme-transition`.

## 🌐 i18n – Contenido centralizado (ES/EN)

- El contenido vive en `src/data/portfolio.json` y `portfolio.en.json`.
- `usePortfolioData` expone hooks por sección: `useHeroData`, `useAboutData`, `useProjectsSectionData`, `useProjectsData`, `useSkillsData`, `useEducationData`, `useContactData`, `useNavigationData`, `useSidebarData`.
- Para traducir, refleja la estructura y claves entre ambos JSON.

## 📚 Sección “Formación y crecimiento”

- Académico: Ingeniería de Software (UCC), periodo, estado, descripción.
- Proyectos académicos destacados (con etiquetas de estado como “En desarrollo”).
- Aprendizaje continuo: temas actuales y objetivo a corto plazo.
- Solo informativa: sin botones ni redirecciones.

## 🖼️ Animaciones y efectos

- Fondo de rayos en WebGL (StormBackground) sin reiniciar la animación al cambiar de tema; se interpolan parámetros para transiciones suaves.
- CursorEffect con estela en Canvas, sincronizado con el tema.
- Animación `.animate-fadeIn` para elementos de `Projects`.

## 🛠️ Instalación

```bash
git clone <repository-url>
cd portfolio
npm install
npm run dev
# http://localhost:3000
```

## 🔧 Configuración y variables de entorno

Crear `.env.local` si se usa el formulario de contacto (EmailJS):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Notas:
- Los logs del envío de correo solo aparecen en desarrollo.
- Ver `src/components/Contact.tsx` para el uso de EmailJS.

## 🧪 Calidad y rendimiento

- ESLint configurado; build con Next.js 15 (Turbopack).
- Limpieza de CSS global: solo utilidades en uso.
- Sin “hover pegado” en mobile (reglas CSS + blur programático).
- Observer de secciones afinado para desktop y mobile.

## 🧩 Scripts

- `npm run dev` – Desarrollo
- `npm run build` – Producción
- `npm run start` – Servidor de producción
- `npm run lint` – ESLint

## 📦 Despliegue

### Vercel (recomendado)

```bash
npm run build
# Conectar y desplegar con Vercel
```

### Docker (opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 Cómo extender el contenido

1) Agregar/editar secciones en `src/data/portfolio.json` y `portfolio.en.json`.
2) Leer datos con los hooks de `usePortfolioData`.
3) Mantener las claves y la estructura entre idiomas.

## 👤 Autor

**Juan Camilo Martínez**

---

Si este proyecto te resultó útil, ¡una estrella siempre se agradece!
