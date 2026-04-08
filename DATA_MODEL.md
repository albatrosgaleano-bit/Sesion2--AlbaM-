# DATA_MODEL.md

## Propósito
Explicar a nivel funcional el modelo de datos base del sistema, alineado con `prisma/schema.prisma`.

## Entidades principales
### User
Representa a un usuario local del sistema.

Campos clave:
- nombre
- email o identificador local
- rol
- estado

### Variety
Representa una variedad cultivada.

Campos clave:
- nombre
- tipo
- notas

### Lot
Entidad central de trazabilidad.

Campos clave:
- código único
- variedad
- origen
- fase actual
- estado
- responsable
- fechas relevantes
- notas

### PhaseTransition
Registra el cambio de una fase a otra.

Campos clave:
- lote
- fase origen
- fase destino
- fecha y hora
- operario
- observaciones

### TraceabilityEvent
Evento genérico asociado a un lote o proceso.

Ejemplos:
- creación de lote
- trasplante
- poda
- cambio de fase
- incidencia
- riego
- asociación a cosecha
- asociación a procesado

### Sensor
Define un sensor o punto de medida.

Campos clave:
- nombre
- tipo
- ubicación
- unidad
- estado

### SensorReading
Lectura de sensor.

Campos clave:
- sensor
- lote opcional
- fase opcional
- valor
- unidad
- fecha y hora

### IrrigationLog
Registro de riego, fertirrigación o tarea hídrica.

Campos clave:
- lote
- fecha y hora
- volumen
- EC
- pH
- observaciones
- operario

### Incident
Incidencia operativa o de calidad.

Campos clave:
- lote
- tipo
- severidad
- descripción
- fecha y hora
- estado
- responsable

### HarvestBatch
Lote de cosecha derivado de uno o varios lotes de cultivo.

Campos clave:
- código
- fecha
- lotes de origen
- peso bruto
- peso neto
- notas

### ProcessingBatch
Lote de procesado o extracción.

Campos clave:
- código
- lote(s) de cosecha origen
- proceso aplicado
- fecha
- rendimiento
- notas

### FinalProduct
Producto final etiquetable.

Campos clave:
- código
- formato
- lote de procesado origen
- estado de calidad
- fecha
- observaciones

### QrCode
QR asociado a un lote, cosecha, procesado o producto final.

Campos clave:
- tipo de entidad
- entidad destino
- contenido o URL local
- fecha de generación
- estado

### Attachment
Archivo adjunto asociado a registros.

Ejemplos:
- imagen
- certificado
- hoja de laboratorio
- foto de incidencia

### AuditLog
Registro inmutable de acciones críticas.

Campos clave:
- usuario
- acción
- entidad
- entidadId
- resumen
- timestamp

### ExportJob
Trabajo de exportación a Google Sheets.

Campos clave:
- tipo de exportación
- rango de fechas
- scope
- estado
- filas exportadas
- errores
- timestamp

## Relaciones críticas
1. Un `Lot` pertenece a una `Variety`.
2. Un `Lot` tiene muchas `PhaseTransition`.
3. Un `Lot` tiene muchos `TraceabilityEvent`.
4. Un `Lot` puede tener muchas `SensorReading`, `IrrigationLog`, `Incident` y `Attachment`.
5. Un `HarvestBatch` deriva de uno o varios `Lot`.
6. Un `ProcessingBatch` deriva de uno o varios `HarvestBatch`.
7. Un `FinalProduct` deriva de un `ProcessingBatch`.
8. Un `QrCode` puede apuntar a distintas entidades.
9. Un `AuditLog` referencia la acción efectuada sobre una entidad.

## Reglas de integridad funcional
- Todo lote debe tener código único.
- Todo cambio de fase debe crear transición y evento.
- Toda acción crítica debe crear auditoría.
- Todo producto final debe poder trazarse hacia atrás.
- Toda exportación debe quedar registrada.
