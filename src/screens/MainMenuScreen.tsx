// src/screens/MainMenuScreen.tsx - Pantalla principal del menú

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ImageBackground
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';

// Services
import authService from '../services/authService';

// Types
import { RootStackParamList, MenuItem } from '../types';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';
import { Fonts } from '../styles/typography';

// Iconos
import iconDialogo from './assets/icon-dialogo.png';
import iconDiario from './assets/icon-diario.png';
import iconMapa from './assets/icon-mapa.png';
import iconMedita from './assets/icon-medita.png';
import iconMensajes from './assets/icon-mensajes.png';
import iconRitual from './assets/icon-ritual.png';
import iconSilencio from './assets/icon-silencio.png';

// Imagen de fondo
import desertBackground from './assets/desert.jpg';

type MainMenuNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: MainMenuNavigationProp;
}

const MainMenuScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems: MenuItem[] = [
    { name: 'Diálogo Conmigo', path: 'DialogoSagrado', icon: '🕊️', emoji: '🕊️', color: Colors.primary, iconAsset: 'icon-dialogo.png' },
    { name: 'Diario Vivo', path: 'DiarioVivo', icon: '📖', emoji: '📖', color: Colors.secondary, iconAsset: 'icon-diario.png' },
    { name: 'Medita Conmigo', path: 'MeditaConmigo', icon: '🧘‍♀️', emoji: '🧘‍♀️', color: Colors.accent, iconAsset: 'icon-medita.png' },
    { name: 'Mensajes del Alma', path: 'MensajesDelAlma', icon: '💌', emoji: '💌', color: Colors.primary, iconAsset: 'icon-mensajes.png' },
    { name: 'Ritual Diario', path: 'RitualDiario', icon: '📅', emoji: '📅', color: Colors.accent, iconAsset: 'icon-ritual.png' },
    { name: 'Mapa Interior', path: 'MapaInterior', icon: '🗺️', emoji: '🗺️', color: Colors.accent, iconAsset: 'icon-mapa.png' },
    { name: 'Silencio Sagrado', path: 'SilencioSagrado', icon: '🤫', emoji: '🤫', color: Colors.primary, iconAsset: 'icon-silencio.png' },
  ];

  const iconMap: Record<string, any> = {
    'icon-dialogo.png': iconDialogo,
    'icon-diario.png': iconDiario,
    'icon-medita.png': iconMedita,
    'icon-mensajes.png': iconMensajes,
    'icon-ritual.png': iconRitual,
    'icon-mapa.png': iconMapa,
    'icon-silencio.png': iconSilencio,
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        }
      ]
    );
  };

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.warn('Error navegando a la pantalla:', screenName, error);
      navigation.push(screenName as any);
    }
  };

  return (
    <ImageBackground
      source={desertBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: Spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
            <Text style={[Fonts.h1, { marginBottom: Spacing.xs }]}>
              BeCalm
            </Text>
            <Text style={[Fonts.body, { textAlign: 'center', opacity: 0.8 }]}>
              Tu santuario digital de paz y bienestar
            </Text>
          </View>

          {/* Menu Items */}
          <View style={{ marginBottom: Spacing.xl }}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => navigateToScreen(item.path)}
                activeOpacity={0.8}
                style={{ marginBottom: Spacing.sm }}
              >
                <LinearGradient
                  colors={[Colors.glassBackground, 'rgba(255, 255, 255, 0.05)']}
                  style={[GlobalStyles.menuItem, { transform: [{ scale: 1 }] }]}
                >
                  <View style={[
                    GlobalStyles.menuItemIcon,
                    {
                      backgroundColor: item.color + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      width: 48,
                      height: 48
                    }
                  ]}>
                    {item.iconAsset ? (
                      <Image
                        source={iconMap[item.iconAsset]}
                        style={{ width: 36, height: 36, resizeMode: 'contain' }}
                      />
                    ) : (
                      <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
                    )}
                  </View>

                  {/* Texto con sombra y visibilidad */}
                  <Text style={[Fonts.bodyEmphasis, {
                    flex: 1,
                    color: '#222',
                    textShadowColor: '#fff',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 1
                  }]}>
                    {item.name}
                  </Text>

                  <Text style={{
                    fontSize: 18,
                    color: Colors.primaryDark,
                    fontWeight: 'bold'
                  }}>
                    ❯
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <View style={{ marginTop: Spacing.lg, marginBottom: Spacing.xl }}>
            <CustomButton
              title="Cerrar Sesión"
              onPress={handleLogout}
              variant="secondary"
              icon="🚪"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default MainMenuScreen;
