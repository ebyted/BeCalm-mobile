// src/screens/MeditaConmigoScreen.tsx - Pantalla de meditación

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Types
import { MeditationSession } from '../types';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing, Fonts } from '../styles/theme';

const MeditaConmigoScreen: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [guidance, setGuidance] = useState('');
  const [loading, setLoading] = useState(false);
  const [musicTracks, setMusicTracks] = useState<string[]>([]);

  const meditationTypes: MeditationSession[] = [
    { 
      name: 'Respiración Consciente', 
      duration: 5, 
      description: 'Enfócate en tu respiración natural para encontrar calma interior' 
    },
    { 
      name: 'Relajación Corporal', 
      duration: 10, 
      description: 'Libera la tensión de todo tu cuerpo progresivamente' 
    },
    { 
      name: 'Mindfulness', 
      duration: 15, 
      description: 'Observa tus pensamientos sin juzgar, cultivando presencia' 
    },
    { 
      name: 'Gratitud', 
      duration: 8, 
      description: 'Cultiva sentimientos de agradecimiento y apreciación' 
    },
    { 
      name: 'Compasión', 
      duration: 12, 
      description: 'Desarrolla amor y compasión hacia ti mismo y otros' 
    },
    { 
      name: 'Visualización', 
      duration: 20, 
      description: 'Crea imágenes mentales para la sanación y el bienestar' 
    }
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

  const startMeditation = async (meditation: MeditationSession) => {
    setLoading(true);
    setCurrentSession(meditation);
    setTimer(meditation.duration * 60);
    
    try {
      // Get meditation guidance
      const response = await apiService.generateContent({
        prompt: `Crea una guía de meditación para ${meditation.name} de ${meditation.duration} minutos. ${meditation.description}. Incluye pasos específicos y frases de apoyo.`,
        mode: 'meditacion'
      });

      if (response && response.text) {
        setGuidance(response.text);
      } else {
        setDefaultGuidance(meditation);
      }

      // Get background music
      try {
        const musicResponse = await apiService.getMeditationMusic({
          prompt: meditation.name,
          mode: 'meditation_music'
        });
        
        if (musicResponse && musicResponse.tracks) {
          setMusicTracks(musicResponse.tracks);
        }
      } catch (musicError) {
        console.error('Error obteniendo música:', musicError);
        generateFallbackMusic();
      }

    } catch (error) {
      console.error('Error obteniendo guía de meditación:', error);
      setDefaultGuidance(meditation);
      generateFallbackMusic();
    } finally {
      setLoading(false);
      setIsActive(true);
    }
  };

  const setDefaultGuidance = (meditation: MeditationSession) => {
    setGuidance(`Bienvenido a tu sesión de ${meditation.name}.

Encuentra una posición cómoda, ya sea sentado o acostado. Cierra los ojos suavemente y permite que tu mente se relaje.

${meditation.description}

Respira naturalmente y permite que cada exhalación te lleve más profundo hacia un estado de calma y serenidad.

Durante estos ${meditation.duration} minutos, date permiso para simplemente ser. No hay nada que tengas que hacer, solo estar presente en este momento.`);
  };

  const generateFallbackMusic = () => {
    const fallbackTracks = [
      'Sonidos Relajantes',
      'Música Ambient para Meditación',
      'Sonidos de la Naturaleza',
      'Frecuencias Curativas',
      'Mantras Instrumentales'
    ];
    setMusicTracks(fallbackTracks);
  };

  const stopMeditation = () => {
    Alert.alert(
      'Detener Meditación',
      '¿Estás seguro de que quieres terminar la sesión?',
      [
        { text: 'Continuar', style: 'cancel' },
        { 
          text: 'Detener', 
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            setTimer(0);
            setCurrentSession(null);
            setGuidance('');
            setMusicTracks([]);
          }
        }
      ]
    );
  };

  const completeMeditation = () => {
    setIsActive(false);
    Alert.alert(
      '¡Meditación Completada! 🙏',
      `Has completado exitosamente tu sesión de ${currentSession?.name}. ¿Cómo te sientes?`,
      [
        { 
          text: 'Finalizar', 
          onPress: () => {
            setCurrentSession(null);
            setGuidance('');
            setMusicTracks([]);
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

  if (loading) {
    return <LoadingSpinner fullScreen message="Preparando tu sesión de meditación..." />;
  }

  if (isActive && currentSession) {
    return (
      <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        
        <ScrollView
          contentContainerStyle={{ flex: 1, padding: Spacing.md, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          {/* Timer Display */}
          <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
            <Text style={{ fontSize: 60, marginBottom: Spacing.md }}>🧘‍♀️</Text>
            <Text style={[GlobalStyles.title, { fontSize: 48, color: Colors.primary }]}>
              {formatTime(timer)}
            </Text>
            <Text style={[GlobalStyles.subtitle, { textAlign: 'center' }]}>
              {currentSession.name}
            </Text>
          </View>

          {/* Guidance */}
          <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg }]}>
            <Text style={[GlobalStyles.bodyText, { lineHeight: 24, textAlign: 'center' }]}>
              {guidance}
            </Text>
          </View>

          {/* Music Tracks */}
          {musicTracks.length > 0 && (
            <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg }]}>
              <Text style={[GlobalStyles.inputLabel, { marginBottom: Spacing.sm }]}>
                🎵 Música de fondo
              </Text>
              {musicTracks.slice(0, 3).map((track, index) => (
                <Text key={index} style={[GlobalStyles.caption, { marginBottom: 4 }]}>
                  • {track}
                </Text>
              ))}
            </View>
          )}

          {/* Controls */}
          <CustomButton
            title="Detener Meditación"
            onPress={stopMeditation}
            variant="secondary"
            icon="⏹️"
          />
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={{ alignItems: 'center', padding: Spacing.md }}>
        <Image source={require('../img/icons/icon-medita.png')} style={{ width: 80, height: 80, marginBottom: Spacing.sm }} />
        <Text style={GlobalStyles.title}>Medita Conmigo</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg }}>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Encuentra tu paz interior con sesiones guiadas personalizadas
          </Text>
        </View>

        {/* Meditation Types */}
        <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
          🌟 Elige tu práctica
        </Text>

        {meditationTypes.map((meditation, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => startMeditation(meditation)}
            activeOpacity={0.8}
            style={{ marginBottom: Spacing.sm }}
          >
            <LinearGradient
              colors={[Colors.glassBackground, 'rgba(255, 255, 255, 0.05)']}
              style={[GlobalStyles.glassCard, { padding: Spacing.md }]}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[GlobalStyles.subtitle, { fontSize: Fonts.large, marginBottom: 4 }]}>
                    {meditation.name}
                  </Text>
                  <Text style={[GlobalStyles.bodyText, { marginBottom: Spacing.xs }]}>
                    {meditation.description}
                  </Text>
                  <Text style={[GlobalStyles.caption, { color: Colors.primary }]}>
                    ⏱️ {meditation.duration} minutos
                  </Text>
                </View>
                
                <Text style={{ fontSize: 24, marginLeft: Spacing.sm }}>
                  ▶️
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Info Card */}
        <View style={[GlobalStyles.glassCard, { marginTop: Spacing.lg, alignItems: 'center' }]}>
          <Text style={{ fontSize: 30, marginBottom: Spacing.sm }}>🌸</Text>
          <Text style={[GlobalStyles.bodyText, { textAlign: 'center', lineHeight: 20 }]}>
            Encuentra un lugar tranquilo, usa auriculares si es posible, y permite que la meditación te guíe hacia un estado de calma profunda.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default MeditaConmigoScreen;
