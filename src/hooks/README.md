# Hooks Personalizados

Este directorio contiene hooks personalizados para manejar la funcionalidad del portfolio.

## 📁 Hooks Disponibles

### `useResponsiveIntersectionObserver`
Hook principal para detectar secciones activas con soporte responsive.

**Características:**
- Detección automática de tamaño de pantalla
- Thresholds adaptativos para móvil y desktop
- RootMargin optimizado para cada dispositivo
- Detección de la sección más visible

**Uso:**
```typescript
const { activeSection, setActiveSection, setSectionRef } = useResponsiveIntersectionObserver();
```

### `useMobileScrollDetection`
Hook especializado para mejorar la detección en dispositivos móviles.

**Características:**
- Detección basada en posición de scroll
- Manejo de eventos táctiles
- Cálculo de distancia desde el centro
- Timeout para evitar cambios frecuentes

**Uso:**
```typescript
useMobileScrollDetection({
  onSectionChange: setActiveSection,
  sections: ['hero', 'about', 'projects', 'skills', 'contact']
});
```

### `usePortfolioData`
Hook para acceder a los datos del portfolio desde el JSON.

**Características:**
- Carga de datos centralizados
- Hooks específicos para cada sección
- Tipado completo con TypeScript

**Uso:**
```typescript
const data = usePortfolioData();
const personalInfo = usePersonalInfo();
const projects = useProjectsData();
```

### `useScrollToSection`
Hook para navegación suave entre secciones.

**Características:**
- Scroll suave con configuración personalizable
- Manejo de errores si la sección no existe
- Optimizado con useCallback

**Uso:**
```typescript
const { scrollToSection } = useScrollToSection();
scrollToSection('about');
```

## 🔧 Configuración

### Thresholds por Dispositivo

**Móvil (< 768px):**
- Thresholds: `[0.1, 0.25, 0.4, 0.6, 0.8]`
- RootMargin: `-20% 0px -20% 0px`
- Min-height de secciones: `50vh`

**Desktop (≥ 768px):**
- Thresholds: `[0.3, 0.5, 0.7, 0.9]`
- RootMargin: `0px` (configurable)
- Min-height de secciones: `60vh`

### Optimizaciones Implementadas

1. **Detección Dual**: Intersection Observer + Scroll Detection
2. **Thresholds Adaptativos**: Diferentes valores para móvil y desktop
3. **RootMargin Negativo**: En móvil para activar antes
4. **Debouncing**: Evita cambios muy frecuentes
5. **Event Listeners Optimizados**: Passive listeners para mejor performance

## 🐛 Debug

### Componente Debug
El componente `DebugSectionIndicator` muestra información en tiempo real:
- Sección activa actual
- Tipo de dispositivo
- Ancho de pantalla

Solo se muestra en modo desarrollo (`NODE_ENV === 'development'`).

### Logs de Debug
Para habilitar logs detallados, agregar en el archivo de configuración:

```typescript
// En development
if (process.env.NODE_ENV === 'development') {
  console.log('Active section:', activeSection);
  console.log('Is mobile:', isMobile);
}
```

## 🚀 Mejoras Futuras

- [ ] Lazy loading de secciones
- [ ] Preload de secciones adyacentes
- [ ] Animaciones de transición
- [ ] Cache de posiciones de scroll
- [ ] Soporte para scroll horizontal
- [ ] Integración con gestos táctiles avanzados

## 📱 Compatibilidad

- **Móvil**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Tablet**: iPad, Android tablets

## ⚡ Performance

- **Event Listeners**: Passive para mejor scroll performance
- **Debouncing**: 150ms para scroll, 100ms para touch
- **Memory Management**: Cleanup automático de observers
- **Re-renders**: Minimizados con useCallback y useMemo
