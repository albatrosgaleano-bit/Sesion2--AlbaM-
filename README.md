# 🌿 Botanic Precision | Trazabilidad Integral

![Botanic Precision Header](https://raw.githubusercontent.com/fjferranComunicaciones/sesion2/main/public/logo-placeholder.png)

> **Sistema local-first de trazabilidad digital avanzada para el cultivo de cannabis medicinal.**

Este proyecto ha sido desarrollado durante la **Sesión 2 del Curso de IA aplicada a la Programación (UA)**. Es una solución robusta diseñada para operar en entornos locales (LAN), garantizando la privacidad de los datos y cumpliendo con estándares internacionales como GACP.

## ✨ Características Destacadas

### 🎨 Diseño Premium y UX Avanzada
- **Interfaz de Vanguardia:** Dashboard dinámico con indicadores clave de rendimiento (KPIs).
- **Modo Oscuro Elegante:** Colores curados para entornos de trabajo profesionales.
- **Responsive Design:** Adaptado para tablets y móviles en el área de cultivo.

### 🔍 Trazabilidad de Extremo a Extremo
- **Linaje de Lotes:** Seguimiento completo desde clones y vegetativo hasta floración y cosecha.
- **Relaciones Padre-Hijo:** Herencia automática de datos entre fases de cultivo.
- **Gestión Geográfica:** Control detallado de salas, estantes y ubicaciones.

### 📱 Ecosistema Digital
- **Generación de QR Dinámicos:** Etiquetas para cada lote y fase del proceso.
- **Monitoreo de Sensores:** Integración de lecturas de temperatura, humedad y luz.
- **Exportación Inteligente:** Conexión directa con Google Sheets para auditorías externas.

## 🚀 Tecnologías Core

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + React
- **Lenguaje:** TypeScript
- **Estilos:** Vanilla CSS / Tailwind CSS v4
- **Base de Datos:** SQLite (Local-First) con [Prisma ORM](https://www.prisma.io/)
- **Infraestructura:** Local LAN support con redirección de IP estática.

---

## 🛠️ Instalación y Puesta en Marcha

Para ejecutar este proyecto en tu entorno local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/fjferranComunicaciones/sesion2.git
   cd sesion2
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura el entorno:**
   Copia el archivo `.env.example` a `.env` y ajusta las variables si es necesario.
   ```bash
   cp .env.example .env
   ```

4. **Inicializa la Base de Datos:**
   ```bash
   npm run db:migrate -- --name init
   npm run db:seed
   ```

5. **Lanza el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Accede a `http://localhost:3000`.

---

## 👨‍💻 Acerca del Desarrollo

Este proyecto nació como parte de una exploración práctica sobre **Agentes de IA y Programación Avanzada**. Se ha puesto especial énfasis en:
- Estructura de código limpia y escalable.
- Documentación técnica exhaustiva (`ARCHITECTURE.md`, `DATA_MODEL.md`).
- Flujos de trabajo automatizados para trazabilidad.

---

Desarrollado con ❤️ para el **Curso de IA Comunicaciones UA**.

