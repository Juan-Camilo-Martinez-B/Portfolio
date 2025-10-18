# Portfolio Personal - Juan Camilo Martínez

Un portfolio moderno y profesional construido con Next.js 15, TypeScript y Tailwind CSS, con efectos visuales avanzados y una arquitectura escalable.

## 🚀 Características

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Efectos Visuales**: Rayos animados con WebGL y efectos de cursor personalizados
- **Arquitectura Modular**: Componentes reutilizables y hooks personalizados
- **TypeScript**: Tipado fuerte para mejor desarrollo
- **Performance**: Optimizado con lazy loading y memoización
- **Accesibilidad**: Cumple estándares de accesibilidad web

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Efectos**: WebGL Shaders, Canvas API
- **Fuentes**: Audiowide, Orbitron (Google Fonts)
- **Linting**: ESLint

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales y variables CSS
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base reutilizables
│   │   ├── Button.tsx    # Botón con variantes
│   │   ├── Card.tsx      # Tarjeta contenedora
│   │   └── Section.tsx   # Sección con estilos
│   ├── AboutMe.tsx       # Sección sobre mí
│   ├── Contact.tsx       # Sección de contacto
│   ├── Hero.tsx          # Sección principal
│   ├── Navbar.tsx        # Navegación
│   ├── Projects.tsx      # Proyectos
│   ├── Sidebar.tsx       # Barra lateral
│   ├── Skills.tsx        # Habilidades
│   ├── CursorEffect.tsx  # Efecto de cursor
│   └── StormBackground.tsx # Fondo animado
├── data/                 # Datos centralizados
│   ├── portfolio.json    # Información completa del portfolio
│   └── README.md         # Documentación del sistema de datos
├── hooks/                # Hooks personalizados
│   ├── useIntersectionObserver.ts
│   ├── useScrollToSection.ts
│   └── usePortfolioData.ts # Hook para datos del portfolio
├── lib/                  # Utilidades
│   └── utils.ts          # Funciones helper
├── types/                # Definiciones TypeScript
│   └── index.ts          # Interfaces y tipos
└── constants/            # Constantes y configuración
    └── index.ts          # Configuraciones del sistema
```

## 🎨 Sistema de Diseño

### Colores
- **Primario**: Naranja (#f97316) - Para acentos y elementos interactivos
- **Secundario**: Gris oscuro (#1f2937) - Para superficies
- **Fondo**: Negro (#000000) - Fondo principal
- **Texto**: Blanco (#ffffff) - Texto principal

### Tipografías
- **Audiowide**: Títulos y elementos destacados
- **Orbitron**: Texto de cuerpo y descripciones

### Componentes Base
- **Button**: Botón con variantes (primary, secondary, outline, ghost)
- **Card**: Contenedor con bordes y sombras
- **Section**: Sección con padding y bordes consistentes

## 🚀 Instalación y Desarrollo

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd portfolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint

## 🎯 Características Técnicas

### Performance
- **Lazy Loading**: Componentes cargados bajo demanda
- **Memoización**: Hooks optimizados con useCallback
- **Intersection Observer**: Navegación automática basada en scroll
- **WebGL**: Efectos visuales optimizados con GPU

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layout**: Grid y Flexbox para layouts adaptativos

### Accesibilidad
- **ARIA Labels**: Etiquetas semánticas
- **Focus Management**: Navegación por teclado
- **Color Contrast**: Cumple estándares WCAG
- **Screen Reader**: Compatible con lectores de pantalla

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Personalización
- **Contenido**: Actualizar datos en `src/data/portfolio.json`
- **Colores**: Modificar variables CSS en `globals.css` o en `portfolio.json`
- **Efectos**: Ajustar parámetros en `StormBackground.tsx`
- **Configuración**: Modificar constantes en `src/constants/index.ts`

### Sistema de Datos Centralizado
Todo el contenido del portfolio está centralizado en `src/data/portfolio.json`. Para actualizar:

1. **Información personal**: Editar `personalInfo`
2. **Proyectos**: Modificar array `projects`
3. **Habilidades**: Actualizar objeto `skills`
4. **SEO**: Cambiar metadatos en `seo`

Ver `src/data/README.md` para documentación completa del sistema de datos.

## 📱 Compatibilidad

- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluciones**: 320px - 4K

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Desplegar en Vercel
```

### Docker
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

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Juan Camilo Martínez**
- Email: correo@ejemplo.com
- GitHub: [@username](https://github.com/username)
- LinkedIn: [Juan Camilo Martínez](https://linkedin.com/in/username)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
