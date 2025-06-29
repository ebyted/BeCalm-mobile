/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import MainMenuScreen from '../src/screens/MainMenuScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
};

test('MainMenuScreen renders correctly', () => {
  const tree = ReactTestRenderer.create(
    <MainMenuScreen navigation={mockNavigation as any} />
  );
  expect(tree).toBeDefined();
});

test('MainMenuScreen has menu items', () => {
  const tree = ReactTestRenderer.create(
    <MainMenuScreen navigation={mockNavigation as any} />
  );
  
  const instance = tree.root;
  const touchableElements = instance.findAllByType(TouchableOpacity);
  
  // Debería tener múltiples TouchableOpacity (items del menú + botón logout)
  expect(touchableElements.length).toBeGreaterThan(3);
});
