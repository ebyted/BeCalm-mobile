// src/components/LoadingSpinner.tsx - Componente de loading

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyles, Colors, Gradients } from '../styles/theme';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  fullScreen = false 
}) => {
  if (fullScreen) {
    return (
      <LinearGradient
        colors={Gradients.background}
        style={GlobalStyles.loadingContainer}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40, marginBottom: 20 }}>🕊️</Text>
          <Text style={[GlobalStyles.title, { marginBottom: 20 }]}>
            BeCalm
          </Text>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={[GlobalStyles.bodyText, { marginTop: 16, textAlign: 'center' }]}>
            {message}
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={[GlobalStyles.bodyText, { marginTop: 8, textAlign: 'center' }]}>
        {message}
      </Text>
    </View>
  );
};

export default LoadingSpinner;
