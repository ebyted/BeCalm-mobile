import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import onboardingService from '../../services/onboardingService';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Colors } from '../../styles/theme';
import { Fonts as typography } from '../../styles/typography';

const OnboardingAIScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params as { name: string };

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const message = await onboardingService.getWelcomeMessage();
        setWelcomeMessage(message);
      } catch (error) {
        console.error(error);
        setWelcomeMessage('Bienvenido a BeCalm. Estamos aquí para ayudarte a encontrar tu paz interior.');
      } finally {
        setLoading(false);
      }
    };

    fetchWelcomeMessage();
  }, [name]);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={typography.title}>Un Mensaje para Ti</Text>
          <Text style={styles.message}>{welcomeMessage}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  message: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default OnboardingAIScreen;
