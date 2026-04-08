# PROMPTS_ANTIGRAVITY.md

## Prompt inicial
Usa el contenido de `START_ANTIGRAVITY.md`.

## Prompt para Sprint 2
Lee de nuevo `README.md`, `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `WORKFLOWS.md`, `API_CONTRACT.md` y `prisma/schema.prisma`.

Implementa el segundo sprint:
- Prisma + migración inicial
- seed.ts
- CRUD de lotes
- cambio de fase
- timeline de trazabilidad
- auditoría
- QR
- actualización de README

Trabaja en este orden:
1. revisar schema y migraciones
2. crear seed
3. implementar servicios y repositorios básicos
4. implementar rutas y páginas de lotes
5. implementar cambio de fase
6. implementar timeline y auditoría
7. implementar QR
8. verificar compilación y documentar cambios

## Prompt para Sprint 3
Lee `README.md`, `WORKFLOWS.md`, `API_CONTRACT.md` y `prisma/schema.prisma`.

Implementa:
- sensores
- lecturas
- riegos
- incidencias

Incluye:
- formularios
- tablas
- validaciones
- asociación a lote y fase
- eventos de trazabilidad cuando aplique
- auditoría en cambios críticos

## Prompt para Sprint 4
Implementa:
- cosecha
- procesado/extracción
- producto final
- navegación completa de trazabilidad hacia atrás
- QR para producto final

## Prompt para Sprint 5
Implementa:
- exportación manual a Google Sheets
- pantalla de exportaciones
- estados de job
- logs básicos
- reintento simple
- documentación de variables de entorno

## Prompt de validación
Revisa el proyecto completo y valida:
- que compila
- que Prisma migra
- que el seed funciona
- que las rutas principales responden
- que la trazabilidad básica funciona
- que la auditoría se registra
- que el README refleja el estado real

Corrige errores y deja una lista final de pruebas manuales.
