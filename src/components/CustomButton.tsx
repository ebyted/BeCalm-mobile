// src/components/CustomButton.tsx - Componente de botón personalizado

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyles, Colors, Gradients } from '../styles/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'gradient';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon
}) => {
  const isDisabled = disabled || loading;

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[{ borderRadius: 12, overflow: 'hidden' }, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDisabled ? [Colors.textMuted, Colors.textMuted] : Gradients.primary}
          style={[GlobalStyles.primaryButton, { shadowOpacity: isDisabled ? 0.1 : 0.25 }]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textPrimary} />
          ) : (
            <>
              {icon && <Text style={{ fontSize: 18, marginRight: 8 }}>{icon}</Text>}
              <Text style={[GlobalStyles.primaryButtonText, textStyle]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const buttonStyle = variant === 'primary' ? GlobalStyles.primaryButton : GlobalStyles.secondaryButton;
  const buttonTextStyle = variant === 'primary' ? GlobalStyles.primaryButtonText : GlobalStyles.secondaryButtonText;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        buttonStyle,
        style,
        {
          opacity: isDisabled ? 0.6 : 1,
          backgroundColor: variant === 'primary' && isDisabled ? Colors.textMuted : buttonStyle.backgroundColor,
        }
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.textPrimary : Colors.primary} />
      ) : (
        <>
          {icon && <Text style={{ fontSize: 18, marginRight: 8 }}>{icon}</Text>}
          <Text style={[buttonTextStyle, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
