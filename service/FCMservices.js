import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };


//register notification ios
  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  // request user permission
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    enabled && console.log("Authorization status", enabled);
  }



  // check permission
  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission reject ', error);
      });
  };

  //getToken device
  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] user does not  have device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken reject', error);
      });
  };


  // register handler notification - app close


  // require permission in device
  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Request Permission  reject', error);
      });
  };

  // delete token
  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] DeleteToken error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // when the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenApp  Notification caused app to open',
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitNotification Notification caused app to open',
        );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    // set background message handler
    registerHandlessTaskClose = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background', remoteMessage);
      const notification = remoteMessage.notification;
      onOpenNotification(notification);
    })



    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCMService arrived!', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh', fcmToken);
      onRegister(fcmToken);
    });
  };
  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
