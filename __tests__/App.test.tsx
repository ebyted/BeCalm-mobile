/**
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';

// Simple component test first
const TestComponent = () => <View><Text>Test</Text></View>;

test('renders a simple component correctly', () => {
  const tree = ReactTestRenderer.create(<TestComponent />);
  expect(tree).toBeDefined();
});

// Test basic imports
test('App module imports correctly', () => {
  const App = require('../App');
  expect(App).toBeDefined();
});
