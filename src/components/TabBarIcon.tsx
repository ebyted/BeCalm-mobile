// src/components/TabBarIcon.tsx - Componente de iconos para la navegación

import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../styles/theme';

interface TabBarIconProps {
  name: string;
  focused: boolean;
  color: string;
}

// Mapa de iconos con emojis espirituales y de bienestar
const iconMap: { [key: string]: string } = {
  home: '🏠',
  'message-circle': '🕊️',
  book: '📖',
  heart: '🧘‍♀️',
  'dialogo-sagrado': '🕊️',
  'diario-vivo': '📖',
  'medita-conmigo': '🧘‍♀️',
  'mensajes-alma': '💌',
  'ritual-diario': '🌸',
  'mapa-interior': '🗺️',
  'silencio-sagrado': '🌙',
  music: '🎵',
  star: '⭐',
  settings: '⚙️',
  user: '👤',
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused, color: _color }) => {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: focused ? `${Colors.primary}20` : 'transparent',
      borderWidth: focused ? 1 : 0,
      borderColor: focused ? `${Colors.primary}40` : 'transparent',
    }}>
      <Text style={{
        fontSize: focused ? 22 : 18,
        textShadowColor: focused ? Colors.glassBackground : 'transparent',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: focused ? 2 : 0,
      }}>
        {iconMap[name] || '❓'}
      </Text>
    </View>
  );
};

export default TabBarIcon;
