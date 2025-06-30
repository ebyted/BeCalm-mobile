// src/screens/onboarding/OnboardingPersonalDataScreen.tsx

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { isValid, parse } from 'date-fns';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { GlobalStyles, Colors, Gradients, Spacing } from '../../styles/theme';
import { Fonts } from '../../styles/typography';
import { OnboardingStackParamList } from '../../navigation/types';
import onboardingService from '../../services/onboardingService';
import DatePicker from 'react-native-date-picker';

type Props = StackScreenProps<OnboardingStackParamList, 'OnboardingPersonalData'>;

const OnboardingPersonalDataScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '', // YYYY-MM-DD
    birth_place: '',
    birth_time: '', // HH:MM (opcional)
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    const { full_name, birth_date, birth_place, birth_time } = formData;
    if (!full_name.trim() || !birth_date.trim() || !birth_place.trim()) {
      Alert.alert('Un momento', 'Por favor, completa tu nombre, fecha y lugar de nacimiento.');
      return;
    }

    const parsedDate = parse(birth_date, 'yyyy-MM-dd', new Date());
    if (!isValid(parsedDate)) {
        Alert.alert('Fecha Inválida', 'Por favor, introduce la fecha en formato YYYY-MM-DD.');
        return;
    }

    if (birth_time) {
        const parsedTime = parse(birth_time, 'HH:mm', new Date());
        if (!isValid(parsedTime)) {
            Alert.alert('Hora Inválida', 'Por favor, introduce la hora en formato HH:MM.');
            return;
        }
    }

    setLoading(true);
    try {
      await onboardingService.savePersonalData(formData);
      navigation.navigate('OnboardingAIScreen', { name: formData.full_name.split(' ')[0] });
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar tus datos. Inténtalo de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={Gradients.background} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <SafeAreaView style={GlobalStyles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ padding: Spacing.lg }}>
            <Text style={[Fonts.h2, { textAlign: 'center', marginBottom: Spacing.sm }]}>
              Un poco sobre ti
            </Text>
            <Text style={[Fonts.body, { textAlign: 'center', marginBottom: Spacing.xl }]}>
              Estos datos nos ayudan a crear una experiencia más personal.
            </Text>
            
            <CustomInput
              label="Tu nombre completo"
              value={formData.full_name}
              onChangeText={(text) => handleInputChange('full_name', text)}
              placeholder="Nombre y Apellido"
              icon="👤"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
              <CustomInput
                label="Fecha de Nacimiento"
                value={formData.birth_date}
                placeholder="YYYY-MM-DD"
                icon="🎂"
                pointerEvents="none"
                onChangeText={() => {}}
              />
            </TouchableOpacity>
            
            <DatePicker
                modal
                open={showDatePicker}
                date={formData.birth_date ? parse(formData.birth_date, 'yyyy-MM-dd', new Date()) : new Date()}
                mode="date"
                onConfirm={(date) => {
                  setShowDatePicker(false);
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  handleInputChange('birth_date', `${yyyy}-${mm}-${dd}`);
                }}
                onCancel={() => {
                  setShowDatePicker(false);
                }}
                title="Selecciona tu fecha de nacimiento"
                confirmText="Confirmar"
                cancelText="Cancelar"
            />

            <CustomInput
              label="Lugar de Nacimiento"
              value={formData.birth_place}
              onChangeText={(text) => handleInputChange('birth_place', text)}
              placeholder="Ciudad, País"
              icon="🌍"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowTimePicker(true)}>
              <CustomInput
                label="Hora de Nacimiento (opcional)"
                value={formData.birth_time}
                placeholder="HH:MM"
                icon="⏰"
                pointerEvents="none"
                onChangeText={() => {}}
              />
            </TouchableOpacity>

            <DatePicker
                modal
                open={showTimePicker}
                date={formData.birth_time ? parse(formData.birth_time, 'HH:mm', new Date()) : new Date()}
                mode="time"
                onConfirm={(time) => {
                  setShowTimePicker(false);
                  const hh = String(time.getHours()).padStart(2, '0');
                  const min = String(time.getMinutes()).padStart(2, '0');
                  handleInputChange('birth_time', `${hh}:${min}`);
                }}
                onCancel={() => {
                  setShowTimePicker(false);
                }}
                title="Selecciona tu hora de nacimiento"
                confirmText="Confirmar"
                cancelText="Cancelar"
            />

            <CustomButton
              title="Generar Bienvenida"
              onPress={handleNext}
              variant="gradient"
              loading={loading}
              style={{ marginTop: Spacing.lg }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingPersonalDataScreen;
