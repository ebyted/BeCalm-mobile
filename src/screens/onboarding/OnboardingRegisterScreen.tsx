import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import onboardingService from '../../services/onboardingService';
import { Colors } from '../../styles/theme';
import { Fonts as typography } from '../../styles/typography';

const OnboardingRegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
        // First, save the username and password to the onboarding data
        // Replace with the correct property names expected by savePersonalData
        await onboardingService.savePersonalData({
          full_name: username, // or provide the actual full name if available
          birth_date: '',      // provide actual birth date if available
          birth_place: '',     // provide actual birth place if available
          // birth_time: '',   // optional, if needed
        });

        // Then, submit the complete onboarding data
        const result = await onboardingService.startOnboarding();

        Alert.alert('Éxito', result);
        navigation.navigate('Login' as never);
    } catch (error: any) {
      Alert.alert('Error de Registro', error.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={typography.title}>Crea tu Cuenta</Text>
      <CustomInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <CustomInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <CustomButton
        title="Finalizar Registro"
        onPress={handleRegister}
        loading={loading}
      />
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
});

export default OnboardingRegisterScreen;
