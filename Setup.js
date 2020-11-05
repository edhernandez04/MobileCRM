import React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAmVjAZ_ijMCNNkYj_Zp6sEqZwnCkm5rJk',
  projectId: 'mobilecrm-e57c8',
  webClientId:
    '984461995380-9pfgi65nnch4ijc9sekotrqecqakb5vi.apps.googleusercontent.com',
  databaseURL: 'https://mobilecrm-e57c8.firebaseio.com',
  storageBucket: 'mobilecrm-e57c8.appspot.com/',
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
