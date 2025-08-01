// src/styles/theme.ts - Tema y estilos principales para BeCalm

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Colors = {
  // Colores principales - Paleta BeCalm actualizada
  primary: '#8fbc8f',        // Verde oliva claro
  primaryDark: '#6b8e6b',    // Verde oliva más oscuro
  primaryLight: '#a4c9a4',   // Verde oliva muy claro
  secondary: '#d2b48c',      // Café claro/beige
  secondaryDark: '#c4a484',  // Café más oscuro
  accent: '#a0a0a0',         // Gris medio
  accentLight: '#b8b8b8',    // Gris claro
  accentDark: '#808080',     // Gris oscuro
  
  // Backgrounds
  background: '#f5f5f0',     // Blanco cremoso
  backgroundLight: '#ffffff', // Blanco puro
  backgroundCard: 'rgba(143, 188, 143, 0.08)', // Verde oliva muy transparente
  
  // Text colors
  textPrimary: '#2f2f2f',    // Gris oscuro para texto principal
  textSecondary: '#5a5a5a',  // Gris medio para texto secundario
  textMuted: '#8a8a8a',      // Gris claro para texto muted
  textOnPrimary: '#ffffff',  // Blanco para texto sobre verde
  
  // Status colors
  success: '#8fbc8f',        // Verde oliva claro
  warning: '#d2b48c',        // Café claro
  error: '#cd5c5c',          // Rojo suave que combina
  info: '#87ceeb',           // Azul suave que combina
  
  // Glass effect
  glassBackground: 'rgba(143, 188, 143, 0.08)', // Verde oliva transparente
  glassBorder: 'rgba(107, 142, 107, 0.3)',      // Verde oliva oscuro para bordes
  
  // Shadows
  shadowColor: '#8fbc8f',    // Sombras en verde oliva suave
};

export const Fonts = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 24,
  title: 28,
  headerTitle: 32,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 50,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  
  // Cards y containers
  glassCard: {
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Typography
  title: {
    fontSize: Fonts.title,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  
  subtitle: {
    fontSize: Fonts.xlarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  
  bodyText: {
    fontSize: Fonts.medium,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  
  caption: {
    fontSize: Fonts.small,
    color: Colors.textMuted,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  primaryButtonText: {
    color: Colors.textOnPrimary,
    fontSize: Fonts.medium,
    fontWeight: '600',
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: Fonts.medium,
    fontWeight: '600',
  },
  
  // Form elements
  input: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Fonts.medium,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    marginBottom: Spacing.sm,
  },
  
  inputLabel: {
    fontSize: Fonts.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  
  // Navigation
  tabBarStyle: {
    backgroundColor: Colors.backgroundLight,
    borderTopColor: Colors.primaryDark,
    borderTopWidth: 2,
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  
  // Menu items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  menuItemIcon: {
    width: 45,
    height: 45,
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  
  menuItemText: {
    fontSize: Fonts.large,
    color: Colors.textOnPrimary, // Cambia a blanco para mejor contraste
    fontWeight: '600',
    flex: 1,
  },
  
  // Status indicators
  successText: {
    color: Colors.success,
    fontSize: Fonts.medium,
    fontWeight: '500',
  },
  
  errorText: {
    color: Colors.error,
    fontSize: Fonts.medium,
    fontWeight: '500',
  },
  
  warningText: {
    color: Colors.warning,
    fontSize: Fonts.medium,
    fontWeight: '500',
  },
});

export const Gradients = {
  primary: [Colors.primaryLight, Colors.primary],          // Verde oliva muy claro a claro
  primaryDark: [Colors.primary, Colors.primaryDark],       // Verde oliva claro a oscuro
  secondary: [Colors.secondary, Colors.secondaryDark],      // Café claro a más intenso
  background: [Colors.background, Colors.backgroundLight], // Crema a blanco
  card: [Colors.backgroundCard, 'rgba(143, 188, 143, 0.02)'], // Verde oliva muy suave
  accent: [Colors.accentLight, Colors.accent],             // Gris claro a medio
  glass: ['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 240, 0.8)'], // Efecto cristal
};

export { width as screenWidth, height as screenHeight };
