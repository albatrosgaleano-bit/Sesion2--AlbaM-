# Sistema local de trazabilidad digital para cannabis medicinal

Aplicacion web `local-first` para trazabilidad de cultivo y procesado de cannabis medicinal en entorno LAN.

La app usa:

- `Next.js` + `React` + `TypeScript`
- `Tailwind CSS` v4
- `Prisma`
- `SQLite`

Google Sheets queda reservado solo como mecanismo de exportacion desde backend.

## Fuente de verdad del proyecto

Antes de extender el codigo, usa estos documentos como referencia principal:

- `README.md`
- `PRD.md`
- `DESIGN.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `WORKFLOWS.md`
- `API_CONTRACT.md`
- `prisma/schema.prisma`
- `.antigravity/skills/cannabis-traceability/SKILL.md`

## Estado actual del scaffold

El proyecto ya incluye:

- shell principal con sidebar + header
- UI base en espanol
- rutas iniciales del MVP
- configuracion de Prisma con SQLite
- pantalla de geneticas con QR maestro por genetica
- foto de flor por genetica en listado y detalle
- subida local de foto real por genetica desde la UI
- generacion de QR por lote y por fase actual
- cadena padre-hijo entre lotes para trazabilidad hacia atras
- seed con datos demo del dominio
- dashboard inicial conectado a Prisma
- listado y detalle base de lotes
- componentes reutilizables iniciales

## Rutas incluidas

- `/dashboard`
- `/geneticas`
- `/geneticas/[id]`
- `/login`
- `/lotes`
- `/lotes/[id]`
- `/sensores`
- `/riegos-incidencias`
- `/cosecha`
- `/procesado`
- `/productos`
- `/productos/[id]`
- `/qr`
- `/auditoria`
- `/exportacion`
- `/configuracion`

## Estructura inicial

```text
src/
  app/
    (app)/
    (auth)/login/
  components/
    layout/
    lots/
    system/
    ui/
  lib/
    dashboard-data.ts
    navigation.ts
    prisma.ts
prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Incoherencias detectadas y criterio aplicado

Durante el analisis aparecieron varias diferencias entre documentos. El scaffold las resuelve asi:

1. `PRD.md` usa fases en espanol y `schema.prisma` usa enums en ingles.
   - criterio: UI en espanol, enums internos del backend tal como estan en Prisma.
2. `DATA_MODEL.md` habla de `Sensor` y `QrCode`, mientras `schema.prisma` usa `SensorDevice` y `QRLabel`.
   - criterio: se respeta `schema.prisma` como modelo ejecutable.
3. `API_CONTRACT.md` propone nombres como `currentPhase: "VEGETATIVA"` o `status: "ACTIVO"`, pero Prisma usa `VEGETATIVE` y `ACTIVE`.
   - criterio: contrato publico pendiente de adaptar con mapeo DTO <-> dominio.
4. El MVP menciona login local, pero aun no define estrategia concreta de sesion.
   - criterio: se creo pantalla base de acceso, sin cerrar todavia la capa de auth.

No hay bloqueo real para continuar el desarrollo.

## Puesta en marcha local

1. Instala dependencias:

```bash
npm install
```

2. Crea la base local, aplica migraciones y carga datos demo:

```bash
npm run db:migrate -- --name init
```

3. Arranca la aplicacion:

```bash
npm run dev
```

4. Abre `http://localhost:3000`.

## QR en LAN

Para que los QR funcionen desde movil o tablet dentro de la red local, configura la IP LAN del servidor en `.env`:

```bash
NEXT_PUBLIC_APP_URL="http://192.168.1.15:3000"
APP_URL="http://192.168.1.15:3000"
```

Si la IP del equipo cambia, actualiza esos valores y reinicia `npm run dev`.

## Fotos de geneticas

- Cada genetica puede tener una foto de flor.
- Las fotos de ejemplo viven en `public/geneticas/`.
- Las fotos subidas desde la UI se guardan localmente en `public/uploads/geneticas/`.

## Comandos utiles

```bash
npm run dev
npm run lint
npm run build
npm run db:generate
npm run db:migrate -- --name <nombre>
npm run db:seed
npm run db:studio
```

## Datos demo cargados por seed

El seed inicial crea:

- usuarios locales por rol
- geneticas `GEN_PACHAMAMA` y `GEN_CANNATONIC`
- foto local de flor para cada genetica de ejemplo
- QR maestro para genetica `GEN_PACHAMAMA`
- cadena completa `clones -> vegetativo -> floracion -> cosecha -> extraccion`
- enlaces padre-hijo entre cada lote de la cadena
- QR especifico para cada lote y su fase
- transiciones de fase y eventos de trazabilidad
- eventos de trazabilidad
- lecturas de sensores
- un riego registrado
- una incidencia abierta
- una cosecha
- un procesado
- un producto final
- etiquetas QR demo
- un job de exportacion
- registros basicos de auditoria

## Siguiente iteracion sugerida

1. CRUD real de lotes con formularios y validacion
2. transiciones de fase con reglas de negocio
3. timeline completo de trazabilidad
4. API route handlers alineados con `API_CONTRACT.md`
5. autenticacion local y permisos por rol
