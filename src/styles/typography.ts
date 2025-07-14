// src/styles/typography.ts

import { StyleSheet } from 'react-native';
import { Colors, Fonts as FontSizes } from './theme';

export const Fonts = StyleSheet.create({
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    fontFamily: 'Rosemarie-Regular',
  },
  h1: {
    fontSize: FontSizes.headerTitle,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    fontFamily: 'Rosemarie-Regular',
  },
  h2: {
    fontSize: FontSizes.xxxlarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: 'Rosemarie-Regular',
  },
  h3: {
    fontSize: FontSizes.xxlarge,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: 'Rosemarie-Regular',
  },
  body: {
    fontSize: FontSizes.large,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  bodyEmphasis: {
    fontSize: FontSizes.large,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  caption: {
    fontSize: FontSizes.medium,
    color: Colors.textMuted,
  },
  small: {
    fontSize: FontSizes.small,
    color: Colors.textMuted,
  },
});
