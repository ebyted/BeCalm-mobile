// src/screens/MensajesDelAlmaScreen.tsx - Pantalla de mensajes inspiracionales

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing } from '../styles/theme';
import { Fonts } from '../styles/typography';

const MensajesDelAlmaScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const messageCategories = [
    { name: 'Inspiración', emoji: '✨', prompt: 'mensaje inspiracional' },
    { name: 'Fortaleza', emoji: '💪', prompt: 'mensaje de fortaleza y coraje' },
    { name: 'Amor Propio', emoji: '💕', prompt: 'mensaje de amor propio y autoestima' },
    { name: 'Sabiduría', emoji: '🦉', prompt: 'mensaje de sabiduría y reflexión' },
    { name: 'Gratitud', emoji: '🙏', prompt: 'mensaje sobre gratitud y apreciación' },
    { name: 'Esperanza', emoji: '🌟', prompt: 'mensaje de esperanza y optimismo' }
  ];

  const generateMessage = async (category: string, prompt: string) => {
    setLoading(true);
    try {
      const response = await apiService.generateContent({
        prompt: `Genera un ${prompt} reconfortante y profundo en español, máximo 100 palabras, que toque el alma y inspire.`,
        mode: 'mensajes_alma'
      });

      setCurrentMessage(response.text || getFallbackMessage(category));
    } catch (error) {
      console.error('Error generando mensaje:', error);
      setCurrentMessage(getFallbackMessage(category));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackMessage = (category: string): string => {
    const messages: { [key: string]: string[] } = {
      'Inspiración': [
        'Eres una luz única en este mundo. Tu presencia importa y tu alma tiene un propósito especial que solo tú puedes cumplir.',
        'Cada día es una nueva oportunidad para crear algo hermoso. Confía en tu poder interior y sigue brillando.'
      ],
      'Fortaleza': [
        'Tu fuerza interior es inquebrantable. Has superado desafíos antes y tienes todo lo necesario para superar este también.',
        'Como el bambú que se dobla pero no se rompe, tu espíritu es resiliente y poderoso.'
      ],
      'Amor Propio': [
        'Eres digno de amor, comenzando por el amor que te das a ti mismo. Trátate con la misma compasión que darías a un querido amigo.',
        'Tu valor no depende de la aprobación externa. Eres completo y perfecto tal como eres en este momento.'
      ],
      'Sabiduría': [
        'La sabiduría no viene de tener todas las respuestas, sino de hacer las preguntas correctas y escuchar con el corazón.',
        'En el silencio de tu alma encontrarás las respuestas que buscas. Confía en tu sabiduría interior.'
      ],
      'Gratitud': [
        'La gratitud transforma lo que tenemos en suficiente. Aprecia los pequeños milagros que te rodean cada día.',
        'Al agradecer lo que tienes hoy, creates espacio para que lleguen más bendiciones a tu vida.'
      ],
      'Esperanza': [
        'Después de la tormenta siempre sale el sol. Tu momento de luz está llegando, mantén la fe.',
        'La esperanza es el puente entre lo que es y lo que puede ser. Sigue construyendo ese puente con tus sueños.'
      ]
    };

    const categoryMessages = messages[category] || messages['Inspiración'];
    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  };

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={{ padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.glassBorder, backgroundColor: 'rgba(255,255,255,0.5)' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: Spacing.md, top: Spacing.md, zIndex: 1 }}>
          <Ionicons name="arrow-back" size={28} color={Colors.primaryDark} />
        </TouchableOpacity>
        <Text style={[Fonts.h2, { textAlign: 'center' }]}>Mensajes del Alma</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg }}>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Recibe palabras que nutren tu espíritu y elevan tu vibración
          </Text>
        </View>

        {/* Current Message */}
        {currentMessage && (
          <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg, alignItems: 'center' }]}>
            <Text style={{ fontSize: 30, marginBottom: Spacing.md }}>🌟</Text>
            <Text style={[
              GlobalStyles.bodyText, 
              { 
                textAlign: 'center', 
                lineHeight: 24, 
                fontSize: 16,
                fontStyle: 'italic'
              }
            ]}>
              "{currentMessage}"
            </Text>
          </View>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner message="Canalizando mensaje para tu alma..." />}

        {/* Categories */}
        <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
          🎭 Elige tu inspiración
        </Text>

        {messageCategories.map((category, index) => (
          <CustomButton
            key={index}
            title={`${category.emoji} ${category.name}`}
            onPress={() => generateMessage(category.name, category.prompt)}
            variant="gradient"
            disabled={loading}
            style={{ marginBottom: Spacing.sm }}
          />
        ))}

        {/* Welcome Message */}
        {!currentMessage && !loading && (
          <View style={[GlobalStyles.glassCard, { marginTop: Spacing.lg, alignItems: 'center' }]}>
            <Text style={{ fontSize: 30, marginBottom: Spacing.sm }}>💝</Text>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 20 }]}>
              Selecciona una categoría para recibir un mensaje personalizado que resuene con las necesidades de tu alma en este momento.
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default MensajesDelAlmaScreen;
