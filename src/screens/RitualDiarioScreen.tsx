// src/screens/RitualDiarioScreen.tsx - Pantalla de rituales diarios

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';

const RitualDiarioScreen: React.FC = () => {
  const [currentRitual, setCurrentRitual] = useState('');
  const [loading, setLoading] = useState(false);

  const ritualTypes = [
    { name: 'Ritual Matutino', emoji: '🌅', time: 'mañana' },
    { name: 'Ritual Vespertino', emoji: '🌙', time: 'noche' },
    { name: 'Ritual de Gratitud', emoji: '🙏', time: 'gratitud' },
    { name: 'Ritual de Limpieza Energética', emoji: '✨', time: 'limpieza' },
    { name: 'Ritual de Conexión', emoji: '🕊️', time: 'conexión' },
    { name: 'Ritual de Abundancia', emoji: '💰', time: 'abundancia' }
  ];

  const generateRitual = async (type: string, time: string) => {
    setLoading(true);
    try {
      const response = await apiService.generateContent({
        prompt: `Crea un ritual espiritual detallado para ${time}, que incluya pasos específicos, afirmaciones y prácticas. Debe ser práctico y significativo, máximo 200 palabras.`,
        mode: 'ritual_diario'
      });

      setCurrentRitual(response.text || getFallbackRitual(type));
    } catch (error) {
      console.error('Error generando ritual:', error);
      setCurrentRitual(getFallbackRitual(type));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackRitual = (type: string): string => {
    const rituals: { [key: string]: string } = {
      'Ritual Matutino': `🌅 RITUAL MATUTINO

1. Al despertar, toma 3 respiraciones profundas
2. Coloca tus manos en tu corazón y di: "Gracias por este nuevo día"
3. Establece una intención positiva para el día
4. Bebe un vaso de agua conscientemente
5. Dedica 5 minutos a estiramientos suaves
6. Afirma: "Estoy listo/a para recibir todas las bendiciones de este día"`,

      'Ritual Vespertino': `🌙 RITUAL VESPERTINO

1. Desconéctate de dispositivos electrónicos
2. Enciende una vela o incienso
3. Reflexiona sobre 3 momentos positivos del día
4. Escribe en tu diario cualquier pensamiento o sentimiento
5. Practica 5 minutos de respiración consciente
6. Agradece al universo por las experiencias del día`,

      'Ritual de Gratitud': `🙏 RITUAL DE GRATITUD

1. Siéntate en un lugar tranquilo
2. Coloca tus manos en posición de oración
3. Enumera 5 cosas por las que te sientes agradecido/a
4. Visualiza cómo estas bendiciones llenan tu corazón de luz
5. Envía gratitud a todas las personas importantes en tu vida
6. Termina diciendo: "Mi corazón está lleno de gratitud"`,

      'Ritual de Limpieza Energética': `✨ RITUAL DE LIMPIEZA ENERGÉTICA

1. Visualiza una luz dorada llenando todo tu ser
2. Imagina que esta luz disuelve cualquier energía negativa
3. Di: "Libero todo lo que no me sirve"
4. Toma una ducha conscientemente, visualizando la purificación
5. Quema salvia o palo santo si tienes
6. Afirma: "Soy un ser de luz pura y amor"`,

      'Ritual de Conexión': `🕊️ RITUAL DE CONEXIÓN

1. Encuentra un momento de silencio total
2. Coloca tus pies descalzos sobre la tierra si es posible
3. Siente tu conexión con el universo
4. Pide guía a tu sabiduría interior
5. Escucha en silencio durante 10 minutos
6. Agradece por la sabiduría recibida`,

      'Ritual de Abundancia': `💰 RITUAL DE ABUNDANCIA

1. Visualiza tus sueños ya manifestados
2. Siente la emoción de tenerlos en tu vida
3. Di: "Soy un imán para la abundancia"
4. Escribe 3 metas que deseas alcanzar
5. Toma una acción pequeña hacia cada meta
6. Agradece por la abundancia que ya tienes`
    };

    return rituals[type] || rituals['Ritual Matutino'];
  };

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={{ alignItems: 'center', padding: Spacing.md }}>
        <Image source={require('../img/icons/icon-ritual.png')} style={{ width: 80, height: 80, marginBottom: Spacing.sm }} />
        <Text style={GlobalStyles.title}>Ritual Diario</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg }}>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Crea ceremonias sagradas que nutran tu alma cada día
          </Text>
        </View>

        {/* Current Ritual */}
        {currentRitual && (
          <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg }]}>
            <Text style={[
              GlobalStyles.bodyText, 
              { 
                lineHeight: 22, 
                fontFamily: 'monospace',
                fontSize: 14
              }
            ]}>
              {currentRitual}
            </Text>
          </View>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner message="Creando tu ritual sagrado..." />}

        {/* Ritual Types */}
        <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
          🕯️ Elige tu ritual
        </Text>

        {ritualTypes.map((ritual, index) => (
          <CustomButton
            key={index}
            title={`${ritual.emoji} ${ritual.name}`}
            onPress={() => generateRitual(ritual.name, ritual.time)}
            variant="gradient"
            disabled={loading}
            style={{ marginBottom: Spacing.sm }}
          />
        ))}

        {/* Welcome Message */}
        {!currentRitual && !loading && (
          <View style={[GlobalStyles.glassCard, { marginTop: Spacing.lg, alignItems: 'center' }]}>
            <Text style={{ fontSize: 30, marginBottom: Spacing.sm }}>🔮</Text>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 20 }]}>
              Los rituales diarios crean espacio sagrado en tu vida. Selecciona el tipo de ritual que resuene con tu momento actual.
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default RitualDiarioScreen;
