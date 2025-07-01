// src/screens/DialogoSagradoScreen.tsx - Pantalla de diálogo con IA

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

// Components
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import apiService from '../services/apiService';

// Types
import { Message } from '../types';

// Styles
import { GlobalStyles, Colors, Gradients, Spacing, Fonts } from '../styles/theme';

const DialogoSagradoScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new messages are added
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const loadHistory = async () => {
    try {
      const history = await apiService.getDialogHistory(2);
      setMessages(history);
    } catch (error) {
      console.error('Error cargando historial:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setLoading(true);

    // Add user message immediately
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await apiService.sendDialogMessage({
        prompt: userMessage,
        mode: 'dialogo_sagrado'
      });

      // Add AI response
      const aiMessage: Message = {
        role: 'ai',
        content: response.text || 'Lo siento, no pude generar una respuesta en este momento.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error enviando mensaje:', error);
      
      // Add fallback response
      const fallbackMessage: Message = {
        role: 'ai',
        content: 'Comprendo tu inquietud. En este momento de reflexión, recuerda que cada pensamiento y sentimiento que compartes es valioso. Tu búsqueda interior es un camino de crecimiento y autoconocimiento.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      
      Alert.alert('Conexión', 'Se guardó tu mensaje, pero hubo un problema al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.role === 'user';
    
    return (
      <View
        key={index}
        style={{
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          backgroundColor: isUser ? Colors.primary + '20' : Colors.glassBackground,
          borderRadius: 16,
          padding: Spacing.md,
          marginVertical: Spacing.xs,
          maxWidth: '80%',
          borderWidth: 1,
          borderColor: isUser ? Colors.primary + '40' : Colors.glassBorder,
        }}
      >
        <Text style={{
          fontSize: Fonts.medium,
          color: Colors.textPrimary,
          lineHeight: 20
        }}>
          {message.content}
        </Text>
        
        <Text style={{
          fontSize: Fonts.small,
          color: Colors.textMuted,
          marginTop: Spacing.xs,
          textAlign: isUser ? 'right' : 'left'
        }}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    );
  };

  if (initialLoading) {
    return <LoadingSpinner fullScreen message="Cargando conversación..." />;
  }

  return (
    <LinearGradient colors={Gradients.background} style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: Spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: Spacing.xxl }}>
              <Text style={{ fontSize: 30, marginBottom: Spacing.md }}>💭</Text>
              <Text style={[GlobalStyles.bodyText, { textAlign: 'center', opacity: 0.8 }]}>
                Inicia una conversación compartiendo tus pensamientos,{'\n'}
                preguntas o inquietudes espirituales
              </Text>
            </View>
          ) : (
            messages.map((message, index) => renderMessage(message, index))
          )}
          
          {loading && (
            <View style={{ alignSelf: 'flex-start', marginVertical: Spacing.sm }}>
              <LoadingSpinner message="Reflexionando..." />
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={{
          padding: Spacing.md,
          borderTopWidth: 1,
          borderTopColor: Colors.glassBorder,
          backgroundColor: Colors.backgroundLight
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Comparte tus pensamientos..."
              placeholderTextColor={Colors.textMuted}
              multiline
              maxLength={500}
              style={[
                GlobalStyles.input,
                {
                  flex: 1,
                  marginBottom: 0,
                  marginRight: Spacing.sm,
                  maxHeight: 100,
                  textAlignVertical: 'top'
                }
              ]}
            />
            
            <CustomButton
              title="Enviar"
              onPress={sendMessage}
              variant="gradient"
              disabled={!inputText.trim() || loading}
              style={{ paddingHorizontal: Spacing.md, paddingVertical: 12 }}
              icon="📤"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default DialogoSagradoScreen;
