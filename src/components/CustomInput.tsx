// src/components/CustomInput.tsx - Componente de input personalizado

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '../styles/theme';

interface CustomInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  disabled?: boolean;
  icon?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  error,
  disabled = false,
  icon
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={GlobalStyles.inputLabel}>
          {icon && <Text style={{ fontSize: 16, marginRight: 8 }}>{icon}</Text>}
          {label}
        </Text>
      )}
      
      <View style={{ position: 'relative' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          style={[
            GlobalStyles.input,
            {
              opacity: disabled ? 0.6 : 1,
              height: multiline ? numberOfLines * 40 : 50,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingRight: isPassword ? 50 : 16,
            },
            error && { borderColor: Colors.error, borderWidth: 1 }
          ]}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{
              position: 'absolute',
              right: 16,
              top: 15,
              padding: 4,
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={[GlobalStyles.errorText, { marginTop: 4, fontSize: 12 }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
