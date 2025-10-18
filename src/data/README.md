# Sistema de Datos del Portfolio

Este directorio contiene toda la información y contenido del portfolio en un archivo JSON centralizado.

## 📁 Estructura

```
src/data/
├── portfolio.json    # Archivo principal con todos los datos
└── README.md        # Esta documentación
```

## 📋 Contenido del portfolio.json

### Estructura Principal

```json
{
  "personalInfo": { ... },      // Información personal
  "hero": { ... },              // Datos de la sección principal
  "about": { ... },             // Información sobre mí
  "projects": [ ... ],          // Lista de proyectos
  "skills": { ... },            // Habilidades organizadas por categoría
  "experience": [ ... ],        // Experiencia laboral
  "education": [ ... ],         // Formación académica
  "contact": { ... },           // Información de contacto
  "navigation": [ ... ],        // Elementos de navegación
  "sidebar": { ... },           // Textos del sidebar
  "theme": { ... },             // Configuración de tema
  "seo": { ... }                // Metadatos SEO
}
```

## 🔧 Cómo Usar

### 1. Hook Principal

```typescript
import { usePortfolioData } from '@/hooks/usePortfolioData';

const MyComponent = () => {
  const data = usePortfolioData();
  // Acceder a cualquier dato del portfolio
};
```

### 2. Hooks Específicos

```typescript
import { 
  usePersonalInfo,
  useHeroData,
  useProjectsData,
  useSkillsData,
  useContactData,
  useNavigationData,
  useSidebarData
} from '@/hooks/usePortfolioData';

// Usar solo los datos que necesites
const personalInfo = usePersonalInfo();
const projects = useProjectsData();
```

## 📝 Cómo Actualizar el Contenido

### 1. Información Personal
```json
{
  "personalInfo": {
    "name": "Tu Nombre",
    "title": "Tu Título",
    "email": "tu@email.com",
    "phone": "+57 300 123 4567",
    "location": "Tu Ciudad",
    "social": {
      "github": "https://github.com/tuusuario",
      "linkedin": "https://linkedin.com/in/tuusuario"
    }
  }
}
```

### 2. Proyectos
```json
{
  "projects": [
    {
      "id": "proyecto-unico",
      "title": "Nombre del Proyecto",
      "description": "Descripción detallada",
      "technologies": ["React", "TypeScript", "Tailwind"],
      "githubUrl": "https://github.com/usuario/proyecto",
      "liveUrl": "https://proyecto-demo.com",
      "featured": true
    }
  ]
}
```

### 3. Habilidades
```json
{
  "skills": {
    "frontend": [
      {
        "name": "React",
        "level": "expert",
        "years": 4
      }
    ]
  }
}
```

## 🎨 Personalización

### Colores del Tema
```json
{
  "theme": {
    "colors": {
      "primary": "#f97316",
      "secondary": "#1f2937",
      "background": "#000000"
    }
  }
}
```

### Metadatos SEO
```json
{
  "seo": {
    "title": "Tu Nombre - Desarrollador",
    "description": "Descripción para motores de búsqueda",
    "keywords": ["desarrollador", "react", "portfolio"],
    "url": "https://tudominio.com"
  }
}
```

## 🔄 Flujo de Datos

1. **portfolio.json** → Contiene todos los datos
2. **usePortfolioData.ts** → Hook que carga y tipa los datos
3. **Componentes** → Consumen los datos via hooks
4. **UI** → Se renderiza dinámicamente

## ✅ Ventajas

- **Centralización**: Todo el contenido en un solo lugar
- **Tipado**: TypeScript garantiza la consistencia
- **Mantenibilidad**: Fácil de actualizar y mantener
- **Escalabilidad**: Fácil agregar nuevas secciones
- **Reutilización**: Los datos se pueden usar en múltiples componentes

## 🚀 Futuras Mejoras

- [ ] Integración con CMS (Strapi, Contentful)
- [ ] Internacionalización (i18n)
- [ ] Carga dinámica desde API
- [ ] Cache de datos
- [ ] Validación de esquemas con Zod

## 📚 Ejemplos de Uso

### Componente Hero
```typescript
const Hero = () => {
  const heroData = useHeroData();
  
  return (
    <div>
      <h1>{heroData.title}</h1>
      <p>{heroData.subtitle}</p>
    </div>
  );
};
```

### Lista de Proyectos
```typescript
const Projects = () => {
  const projects = useProjectsData();
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

---

**Nota**: Siempre mantén la estructura del JSON consistente para evitar errores en los componentes.
