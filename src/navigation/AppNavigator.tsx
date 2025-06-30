// src/navigation/AppNavigator.tsx

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigators
import OnboardingNavigator from './OnboardingNavigator';

// Screens
import LoginScreen from '../screens/LoginScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import DialogoSagradoScreen from '../screens/DialogoSagradoScreen';
import DiarioVivoScreen from '../screens/DiarioVivoScreen';
import MeditaConmigoScreen from '../screens/MeditaConmigoScreen';
import MensajesDelAlmaScreen from '../screens/MensajesDelAlmaScreen';
import RitualDiarioScreen from '../screens/RitualDiarioScreen';
import MapaInteriorScreen from '../screens/MapaInteriorScreen';
import SilencioSagradoScreen from '../screens/SilencioSagradoScreen';
import DevScreen from '../screens/DevScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Components
import TabBarIcon from '../components/TabBarIcon';

// Types
import { RootStackParamList, MainStackParamList, MainTabParamList } from './types';

// Styles
import { Colors, GlobalStyles } from '../styles/theme';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: GlobalStyles.tabBarStyle,
      tabBarActiveTintColor: Colors.primaryDark,
      tabBarInactiveTintColor: Colors.accent,
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 2,
      },
      tabBarIconStyle: {
        marginTop: 2,
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
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Perfil',
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon name="user" focused={focused} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainAppStack = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="MainTabs" component={MainTabs} />
    <MainStack.Screen name="MensajesDelAlma" component={MensajesDelAlmaScreen} />
    <MainStack.Screen name="RitualDiario" component={RitualDiarioScreen} />
    <MainStack.Screen name="MapaInterior" component={MapaInteriorScreen} />
    <MainStack.Screen name="SilencioSagrado" component={SilencioSagradoScreen} />
    <MainStack.Screen name="Dev" component={DevScreen} />
  </MainStack.Navigator>
);

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
        if (onboardingComplete === 'true') {
          setInitialRoute('Login');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (e) {
        // error reading value
        setInitialRoute('Onboarding');
      }
    };

    checkOnboardingStatus();
  }, []);

  if (!initialRoute) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Main" component={MainAppStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
