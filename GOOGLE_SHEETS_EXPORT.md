# GOOGLE_SHEETS_EXPORT.md

## Objetivo
Definir cómo exportar datos operativos a Google Sheets sin convertir Sheets en la base principal del sistema.

## Principios
1. SQLite es la fuente de verdad.
2. Google Sheets es salida bajo demanda.
3. Las credenciales solo viven en backend.
4. Toda exportación queda registrada en `ExportJob`.

## Casos de uso
- Exportación completa del sistema.
- Exportación por lote.
- Exportación por rango de fechas.
- Exportación de auditoría.
- Exportación de eventos de trazabilidad.

## Estructura de hojas sugerida
### 1. `Resumen`
- Fecha de exportación
- Scope
- Número de lotes
- Número de eventos
- Número de incidencias
- Número de registros de riego
- Número de lecturas de sensores

### 2. `Lotes`
- Código
- Variedad
- Fase actual
- Estado
- Responsable
- Fecha de creación

### 3. `Eventos`
- Timestamp
- Lote
- Tipo de evento
- Fase
- Usuario
- Notas

### 4. `Auditoria`
- Timestamp
- Usuario
- Acción
- Entidad
- EntidadId
- Resumen

### 5. `Sensores`
- Timestamp
- Sensor
- Lote
- Fase
- Valor
- Unidad

## Estrategia técnica
- Un servicio backend recopila datos desde Prisma.
- Construye matrices por hoja.
- Crea o actualiza una hoja destino.
- Registra estado, filas exportadas y errores.

## Requisitos técnicos
- Variables de entorno para credenciales.
- Reintentos básicos.
- Mensajes de error visibles.
- No bloquear la app principal si falla la exportación.

## Estados de exportación
- PENDING
- RUNNING
- SUCCESS
- FAILED

## Criterio de implementación
Primero implementar exportación manual básica. Después añadir filtros, reintento y plantillas avanzadas.
