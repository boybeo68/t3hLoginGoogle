/**
 * @format
 */
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { localNotificationService } from './service/localNotificationService';
// localNotificationService.config()
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handle in the  background', remoteMessage);
});
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;
    } else {
        return <App />;
    }
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
