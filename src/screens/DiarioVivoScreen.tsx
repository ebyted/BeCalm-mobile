// src/screens/DiarioVivoScreen.tsx - Pantalla del diario personal

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Types
import { DiaryEntry } from '../types';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing, Fonts } from '../styles/theme';

const DiarioVivoScreen: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      saveEntries();
    }
  }, [entries]);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('diario_entries');
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setEntries(entriesWithDates);
      }
    } catch (error) {
      console.error('Error cargando entradas:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const saveEntries = async () => {
    try {
      await AsyncStorage.setItem('diario_entries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error guardando entradas:', error);
    }
  };

  const saveEntry = async () => {
    if (!newEntry.trim()) return;

    setLoading(true);
    const entryText = newEntry.trim();
    setNewEntry('');

    try {
      const response = await apiService.generateContent({
        prompt: `Reflexiona sobre esta entrada de diario: "${entryText}". Proporciona una perspectiva reflexiva y alentadora en español, máximo 150 palabras.`,
        mode: 'diario_vivo'
      });

      const entry: DiaryEntry = {
        id: Date.now(),
        text: entryText,
        reflection: response.text || getFallbackReflection(),
        timestamp: new Date()
      };
      
      setEntries(prev => [entry, ...prev]);
      
    } catch (error) {
      console.error('Error al obtener reflexión de IA:', error);
      
      const entry: DiaryEntry = {
        id: Date.now(),
        text: entryText,
        reflection: getFallbackReflection(),
        timestamp: new Date()
      };
      
      setEntries(prev => [entry, ...prev]);
      Alert.alert('Guardado', 'Tu entrada se guardó, pero no se pudo generar una reflexión automática');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackReflection = (): string => {
    const reflections = [
      'Tu reflexión es valiosa. Cada palabra escrita es un paso hacia el autoconocimiento y el crecimiento personal. Continúa explorando tus pensamientos con curiosidad y compasión.',
      'Escribir sobre nuestros pensamientos y sentimientos es un acto de valentía. Te felicito por tomarte este tiempo para conectar contigo mismo/a.',
      'Cada entrada en tu diario es una semilla de sabiduría personal. Con el tiempo, estas reflexiones te ayudarán a ver patrones y crecimiento en tu vida.',
      'Tu honestidad contigo mismo/a es admirable. Estos momentos de introspección son fundamentales para tu bienestar emocional y mental.',
      'Al escribir tus pensamientos, estás creando un espacio sagrado para tu crecimiento personal. Cada reflexión es un regalo que te das a ti mismo/a.'
    ];
    return reflections[Math.floor(Math.random() * reflections.length)];
  };

  const deleteEntry = (entryId: number) => {
    Alert.alert(
      'Eliminar entrada',
      '¿Estás seguro de que quieres eliminar esta entrada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => setEntries(prev => prev.filter(entry => entry.id !== entryId))
        }
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderEntry = (entry: DiaryEntry) => (
    <View key={entry.id} style={[GlobalStyles.glassCard, { marginBottom: Spacing.md }]}>
      {/* Entry Header */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: Spacing.sm 
      }}>
        <Text style={[GlobalStyles.caption, { color: Colors.textMuted }]}>
          {formatDate(entry.timestamp)}
        </Text>
        <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
          <Text style={{ fontSize: 18, color: Colors.error }}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      {/* User Entry */}
      <View style={{
        backgroundColor: Colors.backgroundCard,
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.sm
      }}>
        <Text style={[GlobalStyles.bodyText, { lineHeight: 20 }]}>
          {entry.text}
        </Text>
      </View>
      
      {/* AI Reflection */}
      <View style={{
        backgroundColor: Colors.primary + '10',
        borderRadius: 12,
        padding: Spacing.md,
        borderLeftWidth: 3,
        borderLeftColor: Colors.primary
      }}>
        <Text style={[GlobalStyles.caption, { color: Colors.primary, marginBottom: Spacing.xs }]}>
          ✨ Reflexión
        </Text>
        <Text style={[GlobalStyles.bodyText, { lineHeight: 20, fontStyle: 'italic' }]}>
          {entry.reflection}
        </Text>
      </View>
    </View>
  );

  if (initialLoading) {
    return <LoadingSpinner fullScreen message="Cargando tu diario..." />;
  }

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
          <Text style={{ fontSize: 40, marginBottom: Spacing.xs }}>📖</Text>
          <Text style={[GlobalStyles.subtitle, { textAlign: 'center' }]}>
            Diario Vivo
          </Text>
          <Text style={[GlobalStyles.caption, { textAlign: 'center', opacity: 0.8 }]}>
            Registra tus pensamientos y recibe reflexiones personalizadas
          </Text>
        </View>

        {/* New Entry Input */}
        <View style={[GlobalStyles.glassCard, { marginBottom: Spacing.lg }]}>
          <Text style={[GlobalStyles.inputLabel, { marginBottom: Spacing.sm }]}>
            ✍️ Nueva entrada
          </Text>
          
          <TextInput
            value={newEntry}
            onChangeText={setNewEntry}
            placeholder="¿Qué está pasando por tu mente hoy?"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            maxLength={1000}
            style={[
              GlobalStyles.input,
              {
                height: 100,
                textAlignVertical: 'top',
                marginBottom: Spacing.md
              }
            ]}
          />
          
          <CustomButton
            title="Guardar Entrada"
            onPress={saveEntry}
            variant="gradient"
            disabled={!newEntry.trim() || loading}
            loading={loading}
            icon="💾"
          />
        </View>

        {/* Entries List */}
        {entries.length === 0 ? (
          <View style={[GlobalStyles.glassCard, { alignItems: 'center', padding: Spacing.xl }]}>
            <Text style={{ fontSize: 40, marginBottom: Spacing.md }}>📝</Text>
            <Text style={[GlobalStyles.bodyText, { textAlign: 'center', opacity: 0.8 }]}>
              Aún no tienes entradas en tu diario.{'\n'}
              Escribe tu primera reflexión para comenzar tu viaje de autoconocimiento.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[GlobalStyles.subtitle, { marginBottom: Spacing.md }]}>
              📚 Tus reflexiones ({entries.length})
            </Text>
            {entries.map(renderEntry)}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default DiarioVivoScreen;
