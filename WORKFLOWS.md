# WORKFLOWS.md

## Objetivo
Describir los flujos operativos que la app debe soportar desde el MVP.

## 1. Alta de lote
1. Usuario entra a `Lotes`.
2. Crea un nuevo lote.
3. Introduce variedad, origen, responsable y fase inicial.
4. El sistema genera código único.
5. El sistema crea evento de trazabilidad inicial.
6. El sistema genera auditoría.
7. El sistema puede generar QR del lote.

## 2. Cambio de fase
1. Usuario abre detalle del lote.
2. Pulsa `Cambiar fase`.
3. Selecciona fase destino.
4. Registra fecha/hora, operario y observaciones.
5. El sistema valida la transición.
6. El sistema actualiza la fase actual del lote.
7. El sistema crea `PhaseTransition`.
8. El sistema crea `TraceabilityEvent`.
9. El sistema crea `AuditLog`.

## 3. Registro de lectura de sensor
1. Usuario o proceso automático registra una lectura.
2. Se asocia al sensor.
3. Opcionalmente se asocia a lote y fase.
4. Se almacena valor, unidad y timestamp.
5. La lectura queda visible en gráficos y tablas.

## 4. Registro de riego o fertirrigación
1. Usuario accede al módulo de riegos.
2. Selecciona lote.
3. Registra fecha/hora, volumen, pH, EC y observaciones.
4. El sistema crea evento de trazabilidad relacionado.
5. Si procede, crea auditoría.

## 5. Registro de incidencia
1. Usuario registra incidencia.
2. Selecciona lote, tipo y severidad.
3. Añade descripción y responsable.
4. La incidencia aparece en detalle de lote y panel de alertas.
5. El sistema crea evento y auditoría si procede.

## 6. Creación de lote de cosecha
1. Usuario crea un lote de cosecha.
2. Selecciona uno o varios lotes de origen.
3. Registra pesos y fecha.
4. El sistema crea vínculos con los lotes fuente.
5. El sistema crea eventos de trazabilidad y auditoría.

## 7. Creación de lote de procesado/extracción
1. Usuario crea lote de procesado.
2. Selecciona uno o varios lotes de cosecha.
3. Define tipo de proceso.
4. Registra fecha, rendimiento y notas.
5. El sistema mantiene la cadena de trazabilidad.

## 8. Creación de producto final
1. Usuario crea un producto final.
2. Lo vincula al lote de procesado.
3. Registra formato, estado y fecha.
4. El sistema puede generar QR del producto.
5. El detalle de producto permite navegar hacia atrás.

## 9. Exportación a Google Sheets
1. Usuario accede al módulo de exportación.
2. Selecciona scope: global, por lote o por rango.
3. El sistema prepara datasets.
4. El backend escribe en Google Sheets.
5. El sistema registra `ExportJob` con resultado.

## 10. Consulta de auditoría
1. Usuario entra a `Auditoría`.
2. Filtra por fecha, usuario, acción o entidad.
3. Consulta el historial de acciones críticas.
4. Puede exportar o revisar detalle si es necesario.
