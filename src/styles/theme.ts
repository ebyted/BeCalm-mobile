// src/styles/theme.ts - Tema y estilos principales para BeCalm

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Colors = {
  // Colores principales - Misma paleta que la web
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#a855f7',
  accent: '#ec4899',
  
  // Backgrounds
  background: '#0f172a',
  backgroundLight: '#1e293b',
  backgroundCard: 'rgba(30, 41, 59, 0.8)',
  
  // Text colors
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Glass effect
  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  
  // Shadows
  shadowColor: '#000',
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
    color: Colors.textPrimary,
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
    borderTopColor: Colors.glassBorder,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
  },
  
  // Menu items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glassBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  
  menuItemIcon: {
    width: 40,
    height: 40,
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  
  menuItemText: {
    fontSize: Fonts.medium,
    color: Colors.textPrimary,
    fontWeight: '500',
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
  primary: ['#6366f1', '#a855f7'],
  secondary: ['#a855f7', '#ec4899'],
  background: ['#0f172a', '#1e293b'],
  card: ['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.9)'],
};

export { width as screenWidth, height as screenHeight };
