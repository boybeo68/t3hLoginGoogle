import React, { useEffect } from 'react';
import { Button, Text, View, Alert, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { fcmService } from './service/FCMservices';
import { localNotificationService } from './service/localNotificationService';
import { notifikasi } from './src/Notifikasi'
import * as Animatable from 'react-native-animatable';
const AnimatedTouchOpacity = Animatable.createAnimatableComponent(TouchableOpacity);

// const addCartEffect = {
//   0: {
//     translateY: 0,
//     opacity: 0,
//     translateX: 0,
//     scale: 1,
//     zIndex: 1,
//   },
//   0.2: {
//     translateY: 100,
//     opacity: 0.2,
//     translateX: 150,
//     scale: 1.1,
//     zIndex: 1,
//   },
//   1: {
//     opacity: 1,
//     translateY: 600,
//     translateX: 400,
//     scale: 0,
//     zIndex: 100,
//   },
// };
const zoomOut = {
  0: {
    opacity: 0,
    scale: 1,

  },
  0.5: {
    opacity: 1,
    scale: 2,
    translateX: 0,
    translateY: 0,
    // translateX: 150,
  },
  1: {
    opacity: 1,
    scale: 0.5,
    translateX: 100,
    translateY: 200,
  },
};
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
      // localNotificationService.showNotification(
      //   0,
      //   notify.title,
      //   notify.body,
      //   notify,
      //   options,
      // );
      localNotificationService.buatChannel("2");
      localNotificationService.showlocalNotification(
        "2", notify.title, notify.body
      )
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
      <Button onPress={() => {
        localNotificationService.buatChannel("1");
        localNotificationService.handleScheduleNotification(
          0,
          "3",
          "Programming di Rumahrafif", "Terima kasih sudah subscribe",
          {},
          {},
          3000,
        );
        // alert('test')
      }} title={'send schedule notification'} />
      <AnimatedTouchOpacity
        animation={zoomOut}
        duration={2000}
        iterationCount={1}

        style={styles.view} ></AnimatedTouchOpacity>
      {/* <Animatable.Text

        iterationCount={'infinite'}
        animation={zoomOut} >Zoom me out</Animatable.Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});
export default App;
