# Prompt inicial para Antigravity

Lee primero estos archivos del workspace y úsalos como fuente de verdad del proyecto:
- `PRD.md`
- `DESIGN.md`
- `prisma/schema.prisma`
- `.antigravity/skills/cannabis-traceability/SKILL.md`

Quiero que construyas la primera versión funcional de una app web local-first de trazabilidad de cannabis medicinal.

## Objetivo
Crear una app que funcione en LAN local, con UI en español, backend local, SQLite + Prisma y exportación bajo demanda a Google Sheets.

## Stack
- Next.js
- React
- Tailwind CSS
- Prisma
- SQLite
- TypeScript

## Reglas
- Usa `prisma/schema.prisma` como base del modelo de datos.
- Usa `DESIGN.md` como fuente de verdad del sistema de diseño.
- Sigue el alcance y prioridades de `PRD.md`.
- Sigue las normas operativas de `SKILL.md`.
- No introduzcas dependencia cloud para el funcionamiento principal.
- Google Sheets debe ser solo exportación desde backend.

## Tareas de esta primera iteración
1. Crear el proyecto Next.js en TypeScript.
2. Configurar Tailwind.
3. Configurar Prisma con SQLite.
4. Crear layout principal con sidebar y header.
5. Crear estas rutas iniciales con datos mock:
   - `/dashboard`
   - `/lotes`
   - `/lotes/[id]`
   - `/sensores`
   - `/qr`
   - `/cosecha`
   - `/procesado`
   - `/exportacion`
   - `/configuracion`
6. Crear componentes reutilizables:
   - PageHeader
   - StatusBadge
   - MetricCard
   - DataTable
   - TimelineEvent
   - QRCard
7. Crear seed inicial de ejemplo.
8. Preparar la app para sustituir mocks por datos reales de SQLite.
9. Generar un `README.md` con pasos de instalación local.

## Entregables esperados
- estructura de proyecto completa
- rutas funcionando
- componentes base reutilizables
- datos mock o seed
- README de arranque
- lista breve de siguientes pasos

Empieza por inspeccionar los archivos del workspace, resumir el plan de implementación y luego crear el scaffold del proyecto.
