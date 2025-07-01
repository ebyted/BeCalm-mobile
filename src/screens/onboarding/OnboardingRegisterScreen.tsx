import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../styles/theme';
import { Fonts as typography } from '../../styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define aquí tus rutas si no lo tienes en otro archivo
// Usa el tipo correcto para la navegación

type RootStackParamList = {
  Login: { username?: string; password?: string } | undefined;
  OnboardingRegister: undefined;
};

const OnboardingRegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'OnboardingRegister'>>();
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 400); // Responsivo: máx 400px

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      // Guardar datos en almacenamiento local para autocompletar en Login
      await AsyncStorage.setItem('lastRegisteredUser', JSON.stringify({ username, password }));
      Alert.alert('Éxito', 'Registro exitoso. Ahora puedes iniciar sesión.');
      navigation.navigate('Login', { username, password });
    } catch (error: any) {
      Alert.alert('Error de Registro', error?.message || 'Ocurrió un error inesperado.');
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
        style={{ width: inputWidth, height: 50 }}
      />

      <CustomInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: inputWidth, height: 50 }}
      />

      <CustomInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ width: inputWidth, height: 50 }}
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
