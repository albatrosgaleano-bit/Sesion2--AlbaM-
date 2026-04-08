import type { Route } from "next";

export type NavigationItem = {
  href: Route;
  label: string;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard", description: "Resumen operativo" },
  { href: "/geneticas", label: "Geneticas", description: "Origen genetico y QR" },
  { href: "/lotes", label: "Lotes", description: "Seguimiento y detalle" },
  { href: "/sensores", label: "Sensores", description: "Lecturas y alertas" },
  { href: "/riegos-incidencias", label: "Riegos", description: "Riegos e incidencias" },
  { href: "/cosecha", label: "Cosecha", description: "Lotes cosechados" },
  { href: "/procesado", label: "Procesado", description: "Procesos y rendimiento" },
  { href: "/productos", label: "Productos", description: "Salida final" },
  { href: "/qr", label: "QR", description: "Etiquetas internas" },
  { href: "/auditoria", label: "Auditoria", description: "Registro de acciones" },
  { href: "/exportacion", label: "Exportacion", description: "Jobs a Google Sheets" },
  { href: "/configuracion", label: "Configuracion", description: "Servidor local" },
];

export const quickLinks: Array<{ href: Route; label: string }> = [
  { href: "/geneticas", label: "Ver geneticas" },
  { href: "/lotes", label: "Nuevo lote" },
  { href: "/qr", label: "Generar QR" },
  { href: "/exportacion", label: "Crear exportacion" }
];
