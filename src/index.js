/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registrar la app para web
AppRegistry.registerComponent(appName, () => App);

// Ejecutar la app en el elemento root
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root')
});
