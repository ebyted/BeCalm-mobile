/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import TabBarIcon from '../src/components/TabBarIcon';

test('TabBarIcon renders correctly when focused', () => {
  const tree = ReactTestRenderer.create(
    <TabBarIcon name="home" focused={true} color="#6366f1" />
  );
  expect(tree).toBeDefined();
});

test('TabBarIcon renders correctly when not focused', () => {
  const tree = ReactTestRenderer.create(
    <TabBarIcon name="medita-conmigo" focused={false} color="#64748b" />
  );
  expect(tree).toBeDefined();
});

test('TabBarIcon handles unknown icon names', () => {
  const tree = ReactTestRenderer.create(
    <TabBarIcon name="unknown-icon" focused={false} color="#64748b" />
  );
  expect(tree).toBeDefined();
});
