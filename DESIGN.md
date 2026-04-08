# DESIGN.md

## Project
Sistema local de trazabilidad digital para cultivo y procesado de cannabis medicinal en invernadero.

## Product intent
Aplicación web local-first para operar en red LAN dentro de una instalación de cultivo y procesado. La aplicación debe permitir registrar, consultar y auditar toda la trazabilidad desde clones/madres hasta producto final, incluyendo eventos de cultivo, cambios de fase, lotes, lecturas de sensores, cosecha, procesado, extracción, etiquetado QR y exportación a Google Sheets.

## Core principles
1. La trazabilidad es la prioridad visual y funcional.
2. La interfaz debe ser clara en condiciones de trabajo reales de invernadero y procesado.
3. Debe poder usarse principalmente en escritorio y tablet.
4. Debe tener baja carga cognitiva.
5. Debe transmitir control operativo, calidad, cumplimiento y auditoría.
6. La estética debe ser profesional, sobria y técnica, evitando una apariencia de app genérica de consumo.
7. El sistema debe sentirse local, robusto y orientado a registro de operaciones.

## Users
- Cultivador
- Operario de invernadero
- Responsable de calidad
- Operario de procesado/extracción
- Administrador técnico

## UI language
Español.

## Design personality
- Técnica
- Limpia
- Robusta
- Industrial ligera
- Agronómica/farmacéutica
- Seria, no lúdica
- Alta legibilidad

## Visual style
Interfaz moderna y neutra con predominio de superficies claras, tablas limpias, tarjetas con datos, estados bien diferenciados y jerarquía tipográfica fuerte. Debe combinar sensación de cuadro de mando industrial con software de control de calidad.

## Color system

### Primary palette
- Primary 700: `#1F6B45`
- Primary 600: `#2C7A52`
- Primary 500: `#3D8B5F`
- Primary 100: `#DCEFE4`
- Primary 50: `#F3F9F5`

### Neutral palette
- Neutral 900: `#1E2328`
- Neutral 800: `#2D333A`
- Neutral 700: `#46505A`
- Neutral 600: `#63707D`
- Neutral 500: `#7E8A96`
- Neutral 400: `#A7B0B8`
- Neutral 300: `#CDD4DA`
- Neutral 200: `#E5EAEE`
- Neutral 100: `#F3F6F8`
- Neutral 50: `#FAFCFD`
- White: `#FFFFFF`

### Semantic colors
- Success: `#2E7D32`
- Success bg: `#EAF6EC`
- Warning: `#B7791F`
- Warning bg: `#FFF6E5`
- Danger: `#C53030`
- Danger bg: `#FDECEC`
- Info: `#2563EB`
- Info bg: `#EAF2FF`

## Typography
- Font family: `Inter`, `system-ui`, `sans-serif`
- H1: 30/38/700
- H2: 24/32/700
- H3: 20/28/600
- Body: 14-16px
- Label: 12px/600
- IDs y códigos en mono

## Spacing
Base 4px. Usar 8, 12, 16, 20, 24, 32, 40, 48, 64.

## Radius and elevation
- Small radius: 8
- Medium radius: 12
- Large radius: 16
- Shadow suave, priorizar borde + espaciado.

## Layout
- Sidebar izquierda fija en escritorio
- Header superior sticky
- App desktop-first
- Tablet soportado
- Móvil secundario

## Core components
- MetricCard
- StatusBadge
- DataTable
- TimelineEvent
- QRCard
- SensorStatCard
- ExportJobCard
- LotSummaryPanel
- LocalServerStatusPanel

## Required screens
- Login
- Dashboard
- Listado de lotes
- Detalle de lote
- Transición de fase
- Historial de trazabilidad
- Lecturas de sensores
- Riegos e incidencias
- Cosecha
- Procesado / extracción
- Producto final
- QR: generar / escanear
- Exportación a Google Sheets
- Configuración del servidor local

## UX rules
- Trazabilidad visible con pocos clics
- Tablas de primera clase
- Timeline claro con fecha, acción, entidad y operario
- Estados vacíos útiles
- Errores operativos explícitos
- UI usable sin Internet; Sheets es solo exportación

## Tone of voice
Operativo, preciso, profesional, calmado.

## Engineering guidance from design
- Preferir Tailwind con componentes reutilizables
- Un único sistema de tablas
- Un único sistema de formularios
- Un único sistema de tarjetas
- Mantener shell estable entre páginas
