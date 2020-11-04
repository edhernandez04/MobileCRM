import React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAmVjAZ_ijMCNNkYj_Zp6sEqZwnCkm5rJk',
  webClientId: '',
  authDomain: 'mobilecrm.firebaseapp.com',
  databaseURL: 'https://mobilecrm.firebaseio.com',
  projectId: 'mobilecrm',
  storageBucket: 'mobilecrm.appspot.com',
  appId: '1:984461995380:ios:5e7f8325c22dcfc26e1021',
  messagingSenderId: '984461995380',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
};

export {firebaseConfig};

firebase.initializeApp(firebaseConfig);

const Setup = () => {
  return <App />;
};

export default Setup;