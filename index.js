import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App/index';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent("MobileCRM", () => App);
