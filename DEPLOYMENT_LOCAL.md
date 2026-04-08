# DEPLOYMENT_LOCAL.md

## Objetivo
Describir cómo desplegar la app en una red local para uso diario en cultivo y procesado.

## Opciones de hardware
- Mini PC dedicado
- Portátil reutilizado
- Raspberry Pi potente si la carga es moderada

## Requisitos base
- Node.js LTS
- SQLite
- Navegador moderno en los clientes
- Red LAN estable

## Modos de despliegue
### Opción 1. Desarrollo local
- `npm install`
- `npm run dev`
- acceso desde la misma máquina o LAN si se configura el host

### Opción 2. Producción simple
- `npm run build`
- `npm run start`
- proceso gestionado por PM2 o servicio equivalente

### Opción 3. Docker
- contenedor de la app
- volumen persistente para SQLite
- volumen para backups y adjuntos

## Requisitos operativos
- Ruta persistente para la base de datos SQLite
- Carpeta para adjuntos
- Carpeta para backups
- Registro de logs

## Seguridad mínima
- Usuario y contraseña local
- Acceso restringido a la LAN
- Copias de seguridad periódicas
- No exponer credenciales de Google al cliente

## Backups
### Mínimo recomendado
- Backup diario del archivo SQLite
- Backup de adjuntos
- Backup de configuración

### Estrategia inicial
- Script simple o tarea programada del sistema
- Archivo con sello temporal

## Recomendación de despliegue
Para el MVP: mini PC o portátil dedicado en la instalación, con Node.js, la app en producción y la base SQLite en disco local con backup diario.
