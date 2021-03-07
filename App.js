import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { fcmService } from './service/FCMservices';
import { localNotificationService } from './service/localNotificationService';

const App = ({
  params,
}) => {
  useEffect(() => {
    fcmService.requestUserPermission();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.config(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : ', token);
    }
    function onNotification(notify) {
      console.log('[App] onNotification : ', notify);
      Alert.alert(
        notify.title,
        notify.body,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }
    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : ', notify);
      // alert('[App] onOpenNotification : ', notify);
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Button onPress={() => {
        localNotificationService.showNotification(
          1, "App notification", "Local notification", {}, {},
        )
      }} title={'send local notificaiton'} />
    </View>
  );
}

export default App;
