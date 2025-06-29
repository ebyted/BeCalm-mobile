/**
 * BeCalm React Native App
 * Tu santuario digital de paz y bienestar
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './navigation/AppNavigator';
import { Colors } from './styles/theme';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={Colors.background}
        translucent={false}
      />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
