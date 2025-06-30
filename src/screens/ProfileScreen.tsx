import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as profileService from '../services/profileService';
import { UserProfile, UserOnboardingData, HeartRateData, AppEvent } from '../types/profile';
import { Fonts as typography } from '../styles/typography';
import { Colors, Spacing, BorderRadius } from '../styles/theme';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [onboardingData, setOnboardingData] = useState<UserOnboardingData | null>(null);
  const [editableOnboardingData, setEditableOnboardingData] = useState<UserOnboardingData | null>(null);
  const [heartRateData, setHeartRateData] = useState<HeartRateData[]>([]);
  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [profileRes, onboardingRes, heartRateRes, appEventsRes] = await Promise.all([
        profileService.getProfile(),
        profileService.getOnboardingData(),
        profileService.getHeartRateData(),
        profileService.getAppEvents(),
      ]);
      setProfile(profileRes);
      setOnboardingData(onboardingRes);
      setEditableOnboardingData(onboardingRes);
      setHeartRateData(heartRateRes);
      setAppEvents(appEventsRes);
    } catch (err) {
      setError('Error al cargar los datos del perfil. Por favor, intente de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleUpdateOnboardingData = async () => {
    if (!editableOnboardingData) return;

    try {
      setLoading(true);
      const updatedData = await profileService.updateOnboardingData(editableOnboardingData);
      setOnboardingData(updatedData);
      setEditableOnboardingData(updatedData);
      setIsEditing(false);
      Alert.alert('Éxito', 'Tus datos han sido actualizados.');
    } catch (err) {
      setError('Error al actualizar los datos. Por favor, intente de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateData = async () => {
    try {
        setLoading(true);
        await profileService.simulateData();
        Alert.alert('Éxito', 'Se han simulado nuevos datos. Vuelve a cargar para verlos.');
        fetchData(); // Re-fetch data after simulation
    } catch (err) {
        setError('Error al simular los datos.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} style={styles.centered} />;
  }

  if (error) {
    return <View style={styles.centered}><Text style={typography.body}>{error}</Text></View>;
  }

  const renderOnboardingData = () => {
    if (!editableOnboardingData) return null;
    if (isEditing) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de Onboarding</Text>
          <TextInput
            style={styles.input}
            value={editableOnboardingData.temple_name}
            onChangeText={(text) => setEditableOnboardingData({ ...editableOnboardingData, temple_name: text })}
            placeholder="Nombre del Templo"
          />
          <TextInput
            style={styles.input}
            value={editableOnboardingData.emotional_state}
            onChangeText={(text) => setEditableOnboardingData({ ...editableOnboardingData, emotional_state: text })}
            placeholder="Estado Emocional"
          />
          <TextInput
            style={styles.input}
            value={editableOnboardingData.intention}
            onChangeText={(text) => setEditableOnboardingData({ ...editableOnboardingData, intention: text })}
            placeholder="Intención"
          />
          <Button title="Guardar Cambios" onPress={handleUpdateOnboardingData} color={Colors.primary} />
          <View style={{ marginTop: 10 }}>
            <Button title="Cancelar" onPress={() => { setIsEditing(false); setEditableOnboardingData(onboardingData); }} color={Colors.secondary} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis Datos de Introspección</Text>
        <Text style={typography.body}><Text style={styles.bold}>Nombre de tu Templo:</Text> {onboardingData?.temple_name}</Text>
        <Text style={typography.body}><Text style={styles.bold}>Estado Emocional:</Text> {onboardingData?.emotional_state}</Text>
        <Text style={typography.body}><Text style={styles.bold}>Intención:</Text> {onboardingData?.intention}</Text>
        <Button title="Editar" onPress={() => setIsEditing(true)} color={Colors.primary} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {profile && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <Text style={typography.body}><Text style={styles.bold}>Email:</Text> {profile.email}</Text>
          <Text style={typography.body}><Text style={styles.bold}>Miembro desde:</Text> {new Date(profile.created_at).toLocaleDateString()}</Text>
        </View>
      )}

      {renderOnboardingData()}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de Smartwatch (Simulado)</Text>
        <Button title="Simular Nuevos Datos" onPress={handleSimulateData} color={Colors.accent} />
        <Text style={styles.subSectionTitle}>Ritmo Cardíaco</Text>
        {heartRateData.slice(0, 5).map(hr => (
          <Text key={hr.id} style={typography.body}>{hr.heart_rate} bpm - {new Date(hr.recorded_at).toLocaleString()}</Text>
        ))}
        <Text style={styles.subSectionTitle}>Eventos de la App</Text>
        {appEvents.slice(0, 5).map(event => (
          <Text key={event.id} style={typography.body}>{event.event_name} - {new Date(event.created_at).toLocaleString()}</Text>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: Colors.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.md,
    backgroundColor: 'white',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  sectionTitle: {
    ...typography.h3, // Changed to h3 for better hierarchy
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  subSectionTitle: {
      ...typography.h3, // Changed to h3
      fontSize: 16,
      marginTop: Spacing.sm,
      marginBottom: Spacing.xs,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: Colors.accentLight,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  bold: {
      fontWeight: 'bold',
  }
});

export default ProfileScreen;
