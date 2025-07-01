// src/screens/SilencioSagradoScreen.tsx - Pantalla de meditación en silencio

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';

const SilencioSagradoScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);

  const durations = [
    { label: '3 minutos', value: 3 * 60, emoji: '🌱' },
    { label: '5 minutos', value: 5 * 60, emoji: '🌿' },
    { label: '10 minutos', value: 10 * 60, emoji: '🌳' },
    { label: '15 minutos', value: 15 * 60, emoji: '🏔️' },
    { label: '20 minutos', value: 20 * 60, emoji: '🌊' },
    { label: '30 minutos', value: 30 * 60, emoji: '⭐' }
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      // Meditation finished
      completeMeditation();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const startSilence = (duration: number) => {
    setSelectedDuration(duration);
    setTimer(duration);
    setIsActive(true);
  };

  const stopSilence = () => {
    Alert.alert(
      'Terminar Silencio',
      '¿Estás seguro de que quieres terminar tu práctica de silencio?',
      [
        { text: 'Continuar', style: 'cancel' },
        { 
          text: 'Terminar', 
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            setTimer(0);
            setSelectedDuration(0);
          }
        }
      ]
    );
  };

  const completeMeditation = () => {
    setIsActive(false);
    Alert.alert(
      '¡Silencio Sagrado Completado! 🙏',
      'Has completado tu práctica de silencio. ¿Cómo te sientes después de este momento de paz interior?',
      [
        { 
          text: 'Finalizar', 
          onPress: () => {
            setSelectedDuration(0);
          }
        }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isActive) {
    return (
      <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: Spacing.md 
        }}>
          {/* Timer Display */}
          <Text style={{ fontSize: 80, marginBottom: Spacing.xl }}>🤫</Text>
          
          <Text style={[GlobalStyles.title, { fontSize: 64, color: Colors.primary, marginBottom: Spacing.lg }]}>
            {formatTime(timer)}
          </Text>
          
          <Text style={[GlobalStyles.subtitle, { textAlign: 'center', marginBottom: Spacing.xl }]}>
            Silencio Sagrado
          </Text>
          
          <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.xl, alignItems: 'center' }]}>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 24 }]}>
              Respira profundamente...{'\n'}
              Encuentra la paz en el silencio...{'\n'}
              Simplemente SÉ...
            </Text>
          </View>

          <CustomButton
            title="Terminar Silencio"
            onPress={stopSilence}
            variant="secondary"
            icon="⏹️"
          />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={{ alignItems: 'center', padding: Spacing.md }}>
        <Image source={require('../img/icons/icon-silencio.png')} style={{ width: 80, height: 80, marginBottom: Spacing.sm }} />
        <Text style={GlobalStyles.title}>Silencio Sagrado</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg }}>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Encuentra la profundidad del ser en el silencio absoluto
          </Text>
        </View>

        {/* Instructions */}
        <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg, alignItems: 'center' }]}>
          <Text style={{ fontSize: 30, marginBottom: Spacing.sm }}>🕯️</Text>
          <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 22 }]}>
            El silencio sagrado es la práctica más pura de meditación. En el silencio completo, 
            encontrarás la voz más profunda de tu alma.
          </Text>
        </View>

        {/* Duration Selection */}
        <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
          ⏰ Elige la duración
        </Text>

        {durations.map((duration, index) => (
          <CustomButton
            key={index}
            title={`${duration.emoji} ${duration.label}`}
            onPress={() => startSilence(duration.value)}
            variant="gradient"
            style={{ marginBottom: Spacing.sm }}
          />
        ))}

        {/* Preparation Guide */}
        <View style={[GlobalStyles.glassCard, { marginTop: Spacing.lg }]}>
          <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.sm, fontSize: 16 }]}>
            🧘‍♀️ Preparación para el silencio
          </Text>
          
          <Text style={[GlobalStyles.bodyText, { lineHeight: 20, marginBottom: Spacing.sm }]}>
            <Text style={{ fontWeight: 'bold' }}>Antes de comenzar:</Text>
          </Text>
          
          <Text style={[GlobalStyles.bodyText, { lineHeight: 20 }]}>
            • Encuentra un lugar tranquilo{'\n'}
            • Siéntate cómodamente con la espalda recta{'\n'}
            • Silencia o apaga tu teléfono{'\n'}
            • Respira profundamente 3 veces{'\n'}
            • Permite que los pensamientos fluyan sin aferrarte a ellos{'\n'}
            • Simplemente observa y SÉ
          </Text>
        </View>

        {/* Benefits */}
        <View style={[GlobalStyles.glassCard, { marginTop: Spacing.md, marginBottom: Spacing.xl }]}>
          <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.sm, fontSize: 16 }]}>
            🌟 Beneficios del silencio sagrado
          </Text>
          
          <Text style={[GlobalStyles.bodyText, { lineHeight: 20 }]}>
            • Calma profunda de la mente{'\n'}
            • Conexión con tu esencia interior{'\n'}
            • Reducción del estrés y la ansiedad{'\n'}
            • Mayor claridad mental{'\n'}
            • Despertar de la conciencia espiritual{'\n'}
            • Paz interior duradera
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SilencioSagradoScreen;
