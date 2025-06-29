// src/navigation/AppNavigator.tsx - Navegación principal de la aplicación

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
// Make sure the file exists at this path, or update the path if needed
import LoginScreen from '../screens/LoginScreen.tsx';
import MainMenuScreen from '../screens/MainMenuScreen.tsx';
import DialogoSagradoScreen from '../screens/DialogoSagradoScreen.tsx';
import DiarioVivoScreen from '../screens/DiarioVivoScreen.tsx';
import MeditaConmigoScreen from '../screens/MeditaConmigoScreen.tsx';
import MensajesDelAlmaScreen from '../screens/MensajesDelAlmaScreen.tsx';
import RitualDiarioScreen from '../screens/RitualDiarioScreen.tsx';
import MapaInteriorScreen from '../screens/MapaInteriorScreen.tsx';
import SilencioSagradoScreen from '../screens/SilencioSagradoScreen.tsx';
import DevScreen from '../screens/DevScreen.tsx';

// Components
import TabBarIcon from '../components/TabBarIcon.tsx';

// Types
import { RootStackParamList } from '../types';

// Styles
import { Colors, GlobalStyles } from '../styles/theme';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: GlobalStyles.tabBarStyle,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="MainMenu"
        component={MainMenuScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DialogoSagrado"
        component={DialogoSagradoScreen}
        options={{
          title: 'Diálogo',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="message-circle" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DiarioVivo"
        component={DiarioVivoScreen}
        options={{
          title: 'Diario',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="book" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MeditaConmigo"
        component={MeditaConmigoScreen}
        options={{
          title: 'Meditar',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="heart" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dev" component={DevScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="MensajesDelAlma" component={MensajesDelAlmaScreen} />
        <Stack.Screen name="RitualDiario" component={RitualDiarioScreen} />
        <Stack.Screen name="MapaInterior" component={MapaInteriorScreen} />
        <Stack.Screen name="SilencioSagrado" component={SilencioSagradoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
