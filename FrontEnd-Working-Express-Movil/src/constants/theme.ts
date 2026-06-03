// src/constants/theme.ts

export const Colors = {
  light: {
    // Paleta de colores autorizada de tu diseño en Stitch
    primary: "#0066FF", // Reemplaza con el color insignia de Working Express
    secondary: "#10B981", // Color secundario (ej. Éxito, activos, contratado)
    accent: "#F59E0B", // Alertas, pendientes, estrellas de calificación
    danger: "#EF4444", // Cancelaciones o errores

    // Tonos de fondo y contenedores
    background: "#F9FAFB", // Fondo grisáceo limpio para las pantallas
    surface: "#FFFFFF", // Fondo blanco para tarjetas (Cards) e inputs
    border: "#E5E7EB", // Color gris claro para separadores y bordes

    // Tipografía
    text: "#111827", // Texto principal (muy legible)
    textSecondary: "#6B7280", // Texto secundario (descripciones, subtítulos)
    icon: "#9CA3AF", // Iconos por defecto descatados
  },
  dark: {
    // Opcional: Configuración para modo oscuro si tus diseños lo contemplan
    primary: "#3B82F6",
    secondary: "#34D399",
    accent: "#FBBF24",
    danger: "#F87171",
    background: "#111827",
    surface: "#1F2937",
    border: "#374151",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    icon: "#6B7280",
  },
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

export type ThemeColors = typeof Colors.light;
