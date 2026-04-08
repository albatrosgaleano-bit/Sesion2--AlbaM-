# API_CONTRACT.md

## Propósito
Definir una propuesta inicial de rutas internas y contratos para el backend local.

## Convenciones
- Base path sugerida: `/api`
- Respuestas JSON
- Validación en servidor
- Fechas en ISO 8601 internamente

## Lotes
### GET /api/lots
Lista lotes con filtros opcionales.

Query params sugeridos:
- `phase`
- `status`
- `varietyId`
- `q`

### POST /api/lots
Crea un lote.

Body sugerido:
```json
{
  "code": "LT-2026-001",
  "varietyId": "...",
  "origin": "Clonación interna",
  "currentPhase": "VEGETATIVA",
  "status": "ACTIVO",
  "responsibleUserId": "...",
  "notes": ""
}
```

### GET /api/lots/:id
Devuelve detalle completo del lote.

### PATCH /api/lots/:id
Actualiza datos editables del lote.

## Cambios de fase
### POST /api/lots/:id/phase-transitions
Registra un cambio de fase.

Body sugerido:
```json
{
  "fromPhase": "VEGETATIVA",
  "toPhase": "FLORACION",
  "performedByUserId": "...",
  "performedAt": "2026-04-08T10:00:00.000Z",
  "notes": "Cambio planificado"
}
```

## Trazabilidad
### GET /api/lots/:id/events
Lista eventos del lote.

### POST /api/lots/:id/events
Crea evento adicional de trazabilidad.

## Sensores
### GET /api/sensors
Lista sensores.

### GET /api/sensor-readings
Lista lecturas con filtros.

### POST /api/sensor-readings
Crea lectura manual o automática.

## Riegos
### GET /api/irrigation-logs
Lista riegos.

### POST /api/irrigation-logs
Crea registro de riego.

## Incidencias
### GET /api/incidents
Lista incidencias.

### POST /api/incidents
Crea incidencia.

### PATCH /api/incidents/:id
Actualiza estado o responsable.

## Cosecha
### GET /api/harvest-batches
Lista lotes de cosecha.

### POST /api/harvest-batches
Crea lote de cosecha.

## Procesado
### GET /api/processing-batches
Lista lotes de procesado.

### POST /api/processing-batches
Crea lote de procesado.

## Producto final
### GET /api/final-products
Lista productos finales.

### POST /api/final-products
Crea producto final.

## QR
### GET /api/qr-codes
Lista QRs.

### POST /api/qr-codes
Genera y registra QR.

Body sugerido:
```json
{
  "entityType": "LOT",
  "entityId": "...",
  "targetPath": "/lotes/123"
}
```

## Auditoría
### GET /api/audit-logs
Lista acciones auditables con filtros.

## Exportación
### POST /api/exports/google-sheets
Lanza una exportación.

Body sugerido:
```json
{
  "scope": "LOT",
  "lotId": "...",
  "dateFrom": "2026-04-01",
  "dateTo": "2026-04-08"
}
```

### GET /api/exports
Lista trabajos de exportación.
