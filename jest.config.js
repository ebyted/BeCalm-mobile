module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-gesture-handler|react-native-vector-icons|react-native-safe-area-context|@react-navigation|react-native-screens|react-native-reanimated|react-native-linear-gradient)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
