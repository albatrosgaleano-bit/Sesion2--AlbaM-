# PRD.md

# Sistema Local de Trazabilidad Digital para Cannabis Medicinal

## 1. Resumen del producto
Aplicación web **local-first** para registrar, consultar y auditar la trazabilidad completa del cultivo y procesado de cannabis medicinal en una instalación conectada por red LAN. El sistema debe cubrir el ciclo completo desde **clones/madres** hasta **producto final**, incluyendo lotes, fases, registros operativos, sensores, cosecha, procesado/extracción, etiquetas QR y exportación de datos a Google Sheets.

El producto está orientado a un entorno de trabajo real de invernadero y procesado, con una interfaz en español, robusta, clara y usable desde escritorio y tablet.

## 2. Objetivo del MVP
Construir un MVP operativo que permita:

1. Crear y gestionar lotes.
2. Registrar cambios de fase con auditoría.
3. Asociar eventos, incidencias, riegos y lecturas de sensores a cada lote.
4. Generar y consultar QR de lotes y productos.
5. Registrar cosecha y procesado con continuidad de trazabilidad.
6. Exportar datos a Google Sheets bajo demanda.
7. Funcionar localmente aunque no haya Internet.

## 3. Problema que resuelve
En operaciones de cultivo y procesado, la información suele estar dispersa entre papel, hojas de cálculo, mensajes y registros parciales. Esto dificulta:

- reconstruir la historia completa de un lote,
- demostrar cumplimiento interno o regulatorio,
- localizar errores de operación,
- vincular producto final con origen y procesado,
- mantener una base de datos consistente y auditable.

La aplicación debe centralizar esa información y hacer visible la cadena de trazabilidad en tiempo real.

## 4. Alcance funcional
### Incluye en el MVP
- Gestión de usuarios local.
- Gestión de variedades.
- Gestión de lotes.
- Gestión de fases.
- Registro de eventos de trazabilidad.
- Registro de lecturas de sensores.
- Registro de riegos y fertilización.
- Registro de incidencias.
- Registro de cosecha.
- Registro de procesado/extracción.
- Registro de producto final.
- Generación y consulta de etiquetas QR.
- Auditoría de acciones.
- Exportación a Google Sheets.
- Estado del servidor local y copias de seguridad básicas.

### Fuera del MVP inicial
- Integración automática avanzada con ERP.
- Multiinstalación o multisitio.
- Firma electrónica avanzada.
- Integración directa con equipos industriales propietarios.
- App móvil nativa.
- Analítica predictiva avanzada.
- Gestión documental GMP avanzada con flujos de aprobación.

## 5. Usuarios
### 5.1 Cultivador
- Consulta estado de lotes.
- Registra tareas e incidencias.
- Revisa QR y datos básicos de trazabilidad.

### 5.2 Operario de invernadero
- Registra riegos, cambios de fase, observaciones y alertas.
- Consulta sensores y tareas pendientes.

### 5.3 Responsable de calidad
- Revisa auditoría, incidencias, estado de lotes y continuidad de trazabilidad.
- Valida exportaciones y consistencia del registro.

### 5.4 Operario de procesado/extracción
- Registra cosechas, lotes de procesado y relaciones con materia prima.
- Genera etiquetas y enlaces hacia producto final.

### 5.5 Administrador técnico
- Gestiona usuarios, parámetros, estados del servidor y exportaciones.

## 6. Roles y permisos base
- **ADMIN**: acceso total.
- **QUALITY**: lectura completa + validación + auditoría + exportación.
- **GROWER**: lotes, fases, sensores, riegos, incidencias.
- **PROCESSOR**: cosecha, procesado, producto final.
- **VIEWER**: solo lectura.

## 7. Flujo operativo principal
1. Se crea un lote inicial de clones, madres o semillas.
2. El sistema genera un identificador único y un QR.
3. El lote entra en una fase operativa.
4. Se registran eventos, lecturas, riegos e incidencias.
5. El lote cambia de fase; cada transición queda auditada.
6. Al cosechar, se crea un lote de cosecha vinculado a uno o más lotes de cultivo.
7. Desde la cosecha se crea uno o más lotes de procesado/extracción.
8. Desde el procesado se crean productos finales.
9. El producto final conserva trazabilidad hacia atrás hasta el lote original.
10. Los datos pueden exportarse a Google Sheets por rango, por lote o de forma global.

## 8. Fases operativas sugeridas
- CLONES
- MADRES
- GERMINACION
- VEGETATIVA
- FLORACION
- COSECHA
- SECADO
- CURADO
- PROCESADO
- EXTRACCION
- PRODUCTO_FINAL
- CERRADO

## 9. Requisitos funcionales
### 9.1 Gestión de lotes
- El sistema debe permitir crear un lote con código único.
- Debe permitir asociar variedad, origen, responsable y notas.
- Debe mostrar la fase actual y el historial completo.
- Debe permitir filtrar por variedad, estado, fase y fechas.

### 9.2 Cambios de fase
- Cada cambio de fase debe registrar origen, destino, fecha, operario y observaciones.
- El cambio debe quedar reflejado en el historial del lote.
- El sistema debe actualizar la fase actual del lote.

### 9.3 Eventos de trazabilidad
- El sistema debe registrar eventos manuales y eventos generados por procesos.
- Un evento puede asociarse a lote, fase, fecha, operario y módulo de origen.
- Los eventos deben ser visibles en una línea temporal por lote.

### 9.4 Sensores
- Debe registrar lecturas manuales o importadas.
- Las lecturas pueden asociarse a sensor, lote, fase y momento temporal.
- Debe permitir visualizar históricos y alertas simples.

### 9.5 Riego y fertilización
- Debe registrar fecha/hora, volumen, pH, EC, receta, método y operario.
- Debe asociarse al lote.

### 9.6 Incidencias
- Debe permitir registrar incidencias con severidad, estado y responsable.
- Debe mostrar si la incidencia está abierta o resuelta.

### 9.7 Cosecha
- Debe crear lotes de cosecha con código único.
- Debe vincular uno o varios lotes origen.
- Debe registrar pesos y fechas.

### 9.8 Procesado / extracción
- Debe crear lotes de procesado.
- Debe enlazarse con uno o varios lotes de cosecha.
- Debe permitir registrar tipo de proceso, estado y rendimiento.

### 9.9 Producto final
- Debe permitir crear productos finales vinculados a un lote de procesado.
- Debe mostrar código, formato, presentación, estado y QR.
- Debe permitir navegar hacia atrás por la cadena de origen.

### 9.10 QR
- Debe generar QR para lotes, cosechas, procesados y productos finales.
- Debe permitir regenerar QR si cambia el formato de impresión.
- El QR debe resolver a una página interna del sistema.

### 9.11 Auditoría
- Todas las operaciones críticas deben registrarse en un log de auditoría.
- La auditoría debe incluir actor, acción, entidad, fecha/hora y resumen del cambio.

### 9.12 Exportación a Google Sheets
- Debe permitir exportar por rango de fechas.
- Debe permitir exportar por lote.
- Debe permitir exportación global.
- Debe registrar el estado del trabajo de exportación.
- El fallo de exportación no debe afectar a la operación local del sistema.

## 10. Requisitos no funcionales
### 10.1 Local-first
- El sistema debe funcionar en la red local sin dependencia de nube para la operativa principal.

### 10.2 Disponibilidad
- Debe seguir siendo usable aunque no haya conexión a Internet.

### 10.3 Rendimiento
- Navegación fluida en listados y detalle con al menos miles de registros.

### 10.4 Seguridad
- Autenticación local con usuario y contraseña.
- Contraseñas almacenadas con hash seguro.
- Protección de credenciales de Google solo en backend.

### 10.5 Auditabilidad
- Debe quedar registro de acciones relevantes y cambios críticos.

### 10.6 Mantenibilidad
- Arquitectura modular.
- Lógica de negocio separada de la UI.
- Esquema de base de datos claro y extensible.

## 11. Páginas del sistema
1. Inicio de sesión
2. Dashboard
3. Listado de lotes
4. Detalle de lote
5. Modal o formulario de transición de fase
6. Página de sensores
7. Página de riegos e incidencias
8. Página de cosecha
9. Página de procesado/extracción
10. Página de producto final
11. Página QR: generar / consultar / imprimir
12. Página de auditoría
13. Página de exportación a Google Sheets
14. Página de configuración del servidor local

## 12. Dashboard mínimo
Debe mostrar:
- lotes activos por fase,
- incidencias abiertas,
- últimas lecturas o alertas,
- últimos cambios de fase,
- exportaciones recientes,
- estado del servidor local.

## 13. Navegación de trazabilidad
Desde cualquier entidad trazable se debe poder navegar a:
- origen,
- operaciones intermedias,
- entidad actual,
- productos derivados,
- auditoría asociada.

## 14. Exportación a Google Sheets
### Hojas mínimas
- `Resumen`
- `Eventos`
- `Auditoria`

### Opciones de exportación
- Por lote.
- Por rango de fechas.
- Exportación completa.

### Estado del job
- Pendiente
- En curso
- Completado
- Fallido

## 15. Supuestos técnicos
- Front-end generado o refinado desde Stitch.
- Implementación funcional con Next.js + Tailwind.
- Backend local con Next.js server actions o API routes.
- SQLite como base de datos para MVP.
- Prisma como ORM.
- Despliegue local en Raspberry Pi o mini PC.

## 16. Estructura de datos de alto nivel
- Usuarios
- Variedades
- Lotes
- Transiciones de fase
- Eventos de trazabilidad
- Sensores
- Lecturas
- Riegos
- Incidencias
- Lotes de cosecha
- Lotes de procesado
- Productos finales
- Etiquetas QR
- Adjuntos
- Auditoría
- Trabajos de exportación

## 17. Criterios de aceptación del MVP
El MVP se considera válido si permite:
1. Crear, editar y consultar lotes.
2. Registrar cambios de fase con historial.
3. Registrar al menos tres tipos de evento operativo.
4. Registrar lecturas de sensores y riegos.
5. Registrar incidencias abiertas y resueltas.
6. Crear lote de cosecha y lote de procesado vinculados.
7. Crear producto final con trazabilidad hacia atrás.
8. Generar QR navegables internamente.
9. Exportar datos a Google Sheets.
10. Consultar auditoría básica de acciones.

## 18. Riesgos y mitigaciones
### Riesgo
Dependencia excesiva de Google Sheets.
### Mitigación
Mantener SQLite como fuente de verdad y Sheets solo como exportación.

### Riesgo
Demasiada complejidad en el MVP.
### Mitigación
Empezar por lotes, fases, eventos, cosecha y exportación.

### Riesgo
Datos inconsistentes entre módulos.
### Mitigación
Centralizar reglas de negocio y validaciones de transición.

## 19. Roadmap sugerido
### Fase 1
- Login local
- Dashboard básico
- CRUD de lotes
- Cambios de fase
- Auditoría inicial

### Fase 2
- Sensores
- Riegos
- Incidencias
- QR

### Fase 3
- Cosecha
- Procesado
- Producto final

### Fase 4
- Exportación a Google Sheets
- Copias de seguridad
- Mejora de informes

## 20. Métricas de éxito iniciales
- Tiempo medio para registrar un cambio de fase.
- Tiempo medio para localizar la trazabilidad de un producto final.
- Porcentaje de lotes con historial completo.
- Número de incidencias registradas y resueltas.
- Número de exportaciones exitosas.
