# TEST_PLAN.md

## Objetivo
Definir las pruebas manuales mínimas para validar el MVP.

## 1. Lotes
- Crear lote nuevo.
- Ver lote en listado.
- Editar lote.
- Filtrar por fase.
- Filtrar por estado.
- Abrir detalle de lote.

## 2. Cambios de fase
- Cambiar fase de un lote.
- Ver actualización de fase actual.
- Ver nueva transición en timeline.
- Ver registro de auditoría.
- Validar error si faltan campos.

## 3. Trazabilidad
- Ver timeline del lote.
- Ver eventos ordenados por fecha.
- Confirmar que el evento de creación aparece.
- Confirmar que el evento de cambio de fase aparece.

## 4. QR
- Generar QR para un lote.
- Ver QR en detalle de lote.
- Abrir listado de QR.
- Descargar o visualizar imagen QR.
- Confirmar que apunta a la ruta local correcta.

## 5. Sensores
- Crear lectura manual.
- Ver lectura asociada al lote.
- Ver lectura en tabla.
- Validar formato de unidades.

## 6. Riegos e incidencias
- Crear registro de riego.
- Crear incidencia.
- Verlos reflejados en la ficha del lote.

## 7. Cosecha y procesado
- Crear lote de cosecha vinculado a lote de origen.
- Crear lote de procesado vinculado a cosecha.
- Ver continuidad de trazabilidad.

## 8. Producto final
- Crear producto final.
- Confirmar trazabilidad hacia atrás.
- Confirmar QR si aplica.

## 9. Auditoría
- Ver auditoría por creación de lote.
- Ver auditoría por edición.
- Ver auditoría por cambio de fase.
- Ver auditoría por generación de QR.

## 10. Exportación
- Lanzar exportación manual.
- Ver estado del job.
- Confirmar registro en auditoría o historial de exportación.

## 11. Operación local
- Arrancar app en red LAN.
- Acceder desde otro dispositivo.
- Confirmar funcionamiento básico sin Internet.
