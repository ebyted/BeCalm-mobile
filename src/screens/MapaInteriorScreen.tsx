// src/screens/MapaInteriorScreen.tsx - Pantalla de exploración interior

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';

const MapaInteriorScreen: React.FC = () => {
  const [currentExploration, setCurrentExploration] = useState('');
  const [loading, setLoading] = useState(false);

  const explorationAreas = [
    { name: 'Emociones', emoji: '💝', description: 'Explora tu mundo emocional' },
    { name: 'Propósito de Vida', emoji: '🎯', description: 'Descubre tu misión en la vida' },
    { name: 'Relaciones', emoji: '👥', description: 'Reflexiona sobre tus conexiones' },
    { name: 'Miedos y Limitaciones', emoji: '🦋', description: 'Transforma tus obstáculos' },
    { name: 'Talentos y Dones', emoji: '✨', description: 'Reconoce tus fortalezas únicas' },
    { name: 'Sueños y Aspiraciones', emoji: '🌟', description: 'Conecta con tus deseos profundos' }
  ];

  const exploreArea = async (area: string, description: string) => {
    setLoading(true);
    try {
      const response = await apiService.generateContent({
        prompt: `Crea una guía de autoexploración sobre ${area}. Incluye preguntas reflexivas profundas, ejercicios de introspección y sugerencias para el crecimiento personal. Máximo 250 palabras.`,
        mode: 'mapa_interior'
      });

      setCurrentExploration(response.text || getFallbackExploration(area));
    } catch (error) {
      console.error('Error generando exploración:', error);
      setCurrentExploration(getFallbackExploration(area));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackExploration = (area: string): string => {
    const explorations: { [key: string]: string } = {
      'Emociones': `💝 EXPLORANDO TUS EMOCIONES

Preguntas para reflexionar:
• ¿Qué emociones siento con más frecuencia?
• ¿Cuáles son mis patrones emocionales?
• ¿Cómo puedo honrar mis sentimientos sin ser controlado por ellos?

Ejercicio:
Dedica 10 minutos diarios a nombrar y sentir tus emociones sin juzgarlas. Imagina que son nubes pasando por el cielo de tu conciencia.

Afirmación:
"Todas mis emociones son válidas y me proporcionan información valiosa sobre mi mundo interior."`,

      'Propósito de Vida': `🎯 DESCUBRIENDO TU PROPÓSITO

Preguntas para reflexionar:
• ¿Qué actividades me hacen perder la noción del tiempo?
• ¿Cómo me gustaría ser recordado/a?
• ¿Qué problemas del mundo me conmueven profundamente?

Ejercicio:
Escribe una carta a tu yo futuro describiendo la vida que deseas crear y el impacto que quieres tener en el mundo.

Afirmación:
"Mi propósito se revela a través de mis pasiones y mi deseo de servir al mundo."`,

      'Relaciones': `👥 REFLEXIONANDO SOBRE TUS RELACIONES

Preguntas para reflexionar:
• ¿Qué patrones veo en mis relaciones?
• ¿Cómo me muestro auténticamente con otros?
• ¿Qué límites necesito establecer o reforzar?

Ejercicio:
Visualiza a las personas importantes en tu vida enviándoles amor y gratitud. Nota qué sentimientos surgen.

Afirmación:
"Atraigo relaciones que nutren mi alma y contribuyen a mi crecimiento."`,

      'Miedos y Limitaciones': `🦋 TRANSFORMANDO OBSTÁCULOS

Preguntas para reflexionar:
• ¿Qué miedos me impiden avanzar?
• ¿Qué creencias limitantes cargo conmigo?
• ¿Cómo puedo transformar estos obstáculos en oportunidades?

Ejercicio:
Escribe tus miedos en papel, luego reescríbelos como oportunidades de crecimiento y fortaleza.

Afirmación:
"Mis miedos son maestros que me guían hacia mi mayor expansión y libertad."`,

      'Talentos y Dones': `✨ RECONOCIENDO TUS DONES

Preguntas para reflexionar:
• ¿Qué habilidades naturales poseo?
• ¿Qué me dicen otros que hago especialmente bien?
• ¿Cómo puedo usar mis talentos para servir?

Ejercicio:
Haz una lista de todos tus talentos, incluso los que consideras pequeños. Celebra cada uno de ellos.

Afirmación:
"Mis talentos únicos son regalos del universo que estoy destinado/a a compartir."`,

      'Sueños y Aspiraciones': `🌟 CONECTANDO CON TUS SUEÑOS

Preguntas para reflexionar:
• ¿Qué sueños he dejado de lado?
• ¿Qué me imagino haciendo en mi vida ideal?
• ¿Qué pequeño paso puedo dar hoy hacia mis sueños?

Ejercicio:
Crea un tablero de visión mental o físico con imágenes que representen tus sueños más profundos.

Afirmación:
"Mis sueños son semillas de mi potencial futuro y merecen ser cultivados con amor."`
    };

    return explorations[area] || explorations['Emociones'];
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
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg }}>
          <Text style={{ fontSize: 40, marginBottom: Spacing.xs }}>🗺️</Text>
          <Text style={[GlobalStyles.subtitle, { textAlign: 'center' }]}>
            Mapa Interior
          </Text>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Explora los territorios profundos de tu ser interior
          </Text>
        </View>

        {/* Current Exploration */}
        {currentExploration && (
          <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg }]}>
            <Text style={[
              GlobalStyles.bodyText, 
              { 
                lineHeight: 22, 
                fontFamily: 'monospace',
                fontSize: 14
              }
            ]}>
              {currentExploration}
            </Text>
          </View>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner message="Cartografiando tu mundo interior..." />}

        {/* Exploration Areas */}
        <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
          🧭 Áreas de exploración
        </Text>

        {explorationAreas.map((area, index) => (
          <View key={index} style={{ marginBottom: Spacing.sm }}>
            <CustomButton
              title={`${area.emoji} ${area.name}`}
              onPress={() => exploreArea(area.name, area.description)}
              variant="gradient"
              disabled={loading}
            />
            <Text style={[GlobalStyles.caption, { 
              textAlign: 'center', 
              marginTop: 4, 
              opacity: 0.7 
            }]}>
              {area.description}
            </Text>
          </View>
        ))}

        {/* Welcome Message */}
        {!currentExploration && !loading && (
          <View style={[GlobalStyles.glassCard, { marginTop: Spacing.lg, alignItems: 'center' }]}>
            <Text style={{ fontSize: 30, marginBottom: Spacing.sm }}>🧭</Text>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 20 }]}>
              El mapa interior es un viaje de autoconocimiento. Cada área que explores te revelará aspectos profundos de tu ser.
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default MapaInteriorScreen;
