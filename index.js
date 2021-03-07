/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { fcmService } from './service/FCMservices';
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => fcmService.registerHandlessTaskClose)
AppRegistry.registerComponent(appName, () => App);
