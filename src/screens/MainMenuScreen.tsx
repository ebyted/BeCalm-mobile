// src/screens/MainMenuScreen.tsx - Pantalla principal del menú

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert
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

type MainMenuNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: MainMenuNavigationProp;
}

const MainMenuScreen: React.FC<Props> = ({ navigation }) => {

  const menuItems: MenuItem[] = [
    {
      name: 'Diálogo Sagrado',
      path: 'DialogoSagrado',
      icon: '🕊️',
      emoji: '🕊️',
      color: '#6366f1'
    },
    {
      name: 'Diario Vivo',
      path: 'DiarioVivo',
      icon: '📖',
      emoji: '📖',
      color: '#a855f7'
    },
    {
      name: 'Medita Conmigo',
      path: 'MeditaConmigo',
      icon: '🧘‍♀️',
      emoji: '🧘‍♀️',
      color: '#ec4899'
    },
    {
      name: 'Mensajes del Alma',
      path: 'MensajesDelAlma',
      icon: '💌',
      emoji: '💌',
      color: '#10b981'
    },
    {
      name: 'Ritual Diario',
      path: 'RitualDiario',
      icon: '🌅',
      emoji: '🌅',
      color: '#f59e0b'
    },
    {
      name: 'Mapa Interior',
      path: 'MapaInterior',
      icon: '🗺️',
      emoji: '🗺️',
      color: '#3b82f6'
    },
    {
      name: 'Silencio Sagrado',
      path: 'SilencioSagrado',
      icon: '🤫',
      emoji: '🤫',
      color: '#8b5cf6'
    }
  ];

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
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    if (screenName === 'DialogoSagrado' || screenName === 'DiarioVivo' || screenName === 'MeditaConmigo') {
      // Estas pantallas están en el tab navigator
      navigation.navigate(screenName as any);
    } else {
      // Estas pantallas son stack screens
      navigation.navigate(screenName);
    }
  };

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text style={{ fontSize: 50, marginBottom: Spacing.sm }}>🕊️</Text>
          <Text style={[GlobalStyles.title, { marginBottom: Spacing.xs }]}>
            BeCalm
          </Text>
          <Text style={[GlobalStyles.bodyText, { textAlign: 'center', opacity: 0.8 }]}>
            Tu santuario digital de paz y bienestar
          </Text>
        </View>

        {/* Menu Items */}
        <View style={{ marginBottom: Spacing.xl }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => navigateToScreen(item.path)}
              activeOpacity={0.8}
              style={{ marginBottom: Spacing.sm }}
            >
              <LinearGradient
                colors={[Colors.glassBackground, 'rgba(255, 255, 255, 0.05)']}
                style={[
                  GlobalStyles.menuItem,
                  {
                    transform: [{ scale: 1 }],
                  }
                ]}
              >
                <View style={[
                  GlobalStyles.menuItemIcon,
                  { backgroundColor: item.color + '20' }
                ]}>
                  <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
                </View>
                
                <Text style={GlobalStyles.menuItemText}>
                  {item.name}
                </Text>
                
                <Text style={{ fontSize: 16, color: Colors.textMuted }}>
                  ➤
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
  );
};

export default MainMenuScreen;
