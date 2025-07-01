import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import onboardingService from '../../services/onboardingService';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
// import { Colors } from '../../styles/theme'; // Remove unused import
import { Fonts as typography } from '../../styles/typography';

const OnboardingAIScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params as { name: string };

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const message = await onboardingService.getWelcomeMessage();
        setWelcomeMessage(message);
        setError(null);
      } catch (err) {
        console.error(err);
        setWelcomeMessage('Bienvenido a BeCalm. Estamos aquí para ayudarte a encontrar tu paz interior.');
        setError('No se pudo generar el mensaje de bienvenida. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchWelcomeMessage();
  }, [name]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={typography.title}>Un Mensaje para Ti</Text>
          <Text style={styles.message}>{welcomeMessage}</Text>
          {error && (
            <Text style={styles.error}>{error}</Text>
          )}
          <CustomButton
            title="Continuar"
            onPress={() => navigation.navigate('OnboardingRegister' as never)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 30,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default OnboardingAIScreen;
