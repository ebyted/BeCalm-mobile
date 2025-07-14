// src/components/TabBarIcon.tsx - Componente de iconos para la navegación

import React from 'react';
import { Image, View, Text } from 'react-native';
import { Colors } from '../styles/theme';

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

// Mapa de iconos con las rutas correctas a los assets existentes
const existingIconMap: { [key: string]: any } = {
  home: require('../screens/assets/icon-medita.png'), // Placeholder
  user: require('../screens/assets/icon-dialogo.png'), // Placeholder
  'dialogo-sagrado': require('../screens/assets/icon-dialogo.png'),
  'diario-vivo': require('../screens/assets/icon-diario.png'),
  'medita-conmigo': require('../screens/assets/icon-medita.png'),
  'mensajes-alma': require('../screens/assets/icon-mensajes.png'),
  'ritual-diario': require('../screens/assets/icon-ritual.png'),
  'mapa-interior': require('../screens/assets/icon-mapa.png'),
  'silencio-sagrado': require('../screens/assets/icon-silencio.png'),
  // NOTA: 'settings' no existe como PNG, usará el fallback.
};

// Mapa de fallback con emojis
const emojiIconMap: { [key: string]: string } = {
  home: '🏠',
  user: '👤',
  'dialogo-sagrado': '🕊️',
  'diario-vivo': '📖',
  'medita-conmigo': '🧘‍♀️',
  settings: '⚙️',
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
  const iconSource = existingIconMap[name];

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
      {iconSource ? (
        <Image
          source={iconSource}
          style={{
            width: focused ? 24 : 20,
            height: focused ? 24 : 20,
            tintColor: focused ? Colors.primary : Colors.textPrimary,
          }}
        />
      ) : (
        <Text style={{
          fontSize: focused ? 22 : 18,
          textShadowColor: focused ? Colors.glassBackground : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: focused ? 2 : 0,
        }}>
          {emojiIconMap[name] || '❓'}
        </Text>
      )}
    </View>
  );
};

export default TabBarIcon;
