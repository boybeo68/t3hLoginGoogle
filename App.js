import React, { useEffect } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { fcmService } from './service/FCMservices';
import { localNotificationService } from './service/localNotificationService';
import { notifikasi } from './src/Notifikasi'
const App = ({
  params,
}) => {
  useEffect(() => {
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
      // Alert.alert(
      //   notify.title,
      //   notify.body,
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     { text: 'OK', onPress: () => console.log('OK Pressed') },
      //   ],
      //   { cancelable: false },
      // );
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Button onPress={() => {
        localNotificationService.buatChannel("1");
        localNotificationService.showlocalNotification(
          "1", "Programming di Rumahrafif", "Terima kasih sudah subscribe"
        )
        // alert('test')
      }} title={'notificaiton old'} />
      <Button onPress={() => {
        // localNotificationService.showNotification(
        //   "App notification", "Local notification",
        // )
        notifikasi.configure();
        notifikasi.buatChannel("1");
        notifikasi.kirimNotifikasiJadwal("1", "Programming di Rumahrafif", "Terima kasih sudah subscribe");
        // alert('test')
      }} title={'send local notificaiton'} />
    </View>
  );
}

export default App;
