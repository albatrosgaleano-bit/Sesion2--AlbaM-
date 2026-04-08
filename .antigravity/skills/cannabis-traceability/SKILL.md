---
name: cannabis-traceability-local
description: Build and maintain a local-first medicinal cannabis traceability web app with QR, audit trail, sensor logs, and Google Sheets export.
---

# Local Medicinal Cannabis Traceability App Skill

## Mission
Construir una app web local-first para trazabilidad completa de cannabis medicinal en cultivo, cosecha, procesado y producto final.

## Stack rules
- Frontend: Next.js + React + Tailwind
- Backend: route handlers o server actions
- Database: SQLite con Prisma
- Idioma de UI: español
- Operación principal: LAN local
- Google Sheets: solo exportación, nunca almacenamiento principal

## Main entities
- User
- Role
- Variety
- Lot
- PhaseTransition
- TraceabilityEvent
- Sensor
- SensorReading
- IrrigationLog
- Incident
- HarvestBatch
- ProcessingBatch
- FinalProduct
- QrCode
- Attachment
- AuditLog
- ExportJob

## Working rules
1. Leer primero `PRD.md`, `DESIGN.md` y `prisma/schema.prisma`.
2. No romper el modelo de trazabilidad hacia atrás.
3. Mantener el estilo visual definido en `DESIGN.md`.
4. Usar componentes reutilizables.
5. Crear primero datos mock y luego conectarlos a SQLite.
6. Registrar auditoría en cambios críticos.
7. Mantener credenciales de Google Sheets solo en backend.

## Recommended order
1. Scaffold del proyecto Next.js
2. Configurar Tailwind y layout base
3. Instalar Prisma y enlazar con SQLite
4. Implementar navegación y páginas vacías
5. Implementar CRUD de lotes
6. Implementar transiciones de fase
7. Implementar timeline de trazabilidad
8. Implementar QR generar/escanear
9. Implementar sensores y riegos
10. Implementar cosecha, procesado y producto final
11. Implementar exportación a Google Sheets
12. Añadir README y Docker

## Output expectations
Cuando trabajes en esta app, entrega:
- cambios de código
- rutas creadas
- componentes creados
- cambios en Prisma
- pasos de ejecución local
- checklist breve de pruebas manuales
