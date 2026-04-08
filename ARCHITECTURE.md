# ARCHITECTURE.md

## Objetivo técnico
Definir una arquitectura simple, mantenible y local-first para una app de trazabilidad digital operativa en red LAN.

## Arquitectura general
### Frontend
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Componentes reutilizables por dominio y por sistema de diseño

### Backend
- Route Handlers o Server Actions en Next.js
- Servicios de dominio separados de la UI
- Validación en servidor
- Generación de QR desde backend o capa compartida
- Exportación a Google Sheets solo desde backend

### Persistencia
- SQLite como base de datos local principal
- Prisma ORM
- Seeds para datos iniciales
- Backups periódicos del archivo SQLite

### Infraestructura local
- Ejecución en mini PC, portátil dedicado o Raspberry Pi
- Acceso desde navegadores conectados a la LAN
- Posibilidad de Docker para despliegue reproducible

## Capas recomendadas
### 1. UI
- Layout
- Navegación
- Páginas
- Componentes reutilizables
- Formularios
- Estados vacíos y de error

### 2. Application
- Casos de uso
- Validación de entrada
- Orquestación de flujos
- Conversión entre DTOs y modelos

### 3. Domain
- Reglas de trazabilidad
- Reglas de transición de fase
- Reglas de auditoría
- Reglas de QR
- Reglas de exportación

### 4. Persistence
- Prisma Client
- Repositorios o servicios de acceso a datos
- Migraciones
- Seed

## Módulos funcionales
- Dashboard
- Lotes
- Fases
- Trazabilidad
- Sensores
- Riegos
- Incidencias
- Cosecha
- Procesado / extracción
- Producto final
- QR
- Auditoría
- Exportación
- Configuración

## Decisiones técnicas clave
1. **SQLite como fuente de verdad** para el MVP.
2. **Google Sheets como exportación**, nunca como almacenamiento principal.
3. **App Router** para ordenar rutas, layouts y carga de datos.
4. **Servicios de dominio** para no mezclar lógica de negocio con UI.
5. **Auditoría centralizada** para acciones críticas.
6. **Trazabilidad hacia atrás obligatoria** desde producto final a lote original.

## Estructura sugerida del proyecto
```text
app/
  dashboard/
  lotes/
  sensores/
  qr/
  cosecha/
  procesado/
  exportacion/
  auditoria/
  configuracion/
components/
  ui/
  layout/
  lots/
  qr/
  audit/
lib/
  prisma.ts
  auth/
  validation/
services/
  lots/
  phases/
  traceability/
  qr/
  audit/
  export/
prisma/
  schema.prisma
  seed.ts
```

## Reglas de diseño de arquitectura
- No usar dependencia cloud para la operación principal.
- No poner credenciales de Google en el cliente.
- No mezclar lógica de negocio con componentes visuales.
- No acoplar la UI a Google Sheets.
- No permitir pérdida de trazabilidad en cambios de fase o productos derivados.

## Escalabilidad futura
- Añadir PostgreSQL si el volumen crece.
- Añadir autenticación más robusta.
- Integrar MQTT u otras fuentes IoT.
- Añadir impresión de etiquetas.
- Añadir sincronización opcional externa.
