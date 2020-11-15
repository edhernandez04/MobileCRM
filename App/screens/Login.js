import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { firebaseConfig } from '../../Setup';
import ProfileCard from '../components/ProfileCard'

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  GoogleSignin.configure({
    webClientId: firebaseConfig.webClientId,
  });

  onAuthStateChanged = user => {
    props.setUser(user)
  };

  onGoogleButtonPress = async () => {
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.idToken
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  signIn = async () => {
    email && password ?
      auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            auth().signInWithEmailAndPassword(email, password)
              .catch(error => {
                console.log(error)
              })
          }
          if (error.code === 'auth/invalid-email') {
            alert('Invalid Email')
          }
          if (error.code === 'auth/weak-password') {
            alert(error.getReason())
          } else {
            console.error(error);
          }
        }) : alert('Missing Login Information')
  }

  return auth()._user ?
    <ProfileCard />
    :
    (
      <View style={styles.mainPageContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/mobilecrm-e57c8.appspot.com/o/KeepContact.png?alt=media&token=9df42cb5-57d7-4dd3-a2e9-0fca2fc1816e',
            }}
          />
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.textInputContainer}>
            <Text>👤</Text>
            <TextInput
              style={styles.inputForm}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              autoCompleteType={'email'}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Text>🔐</Text>
            <TextInput
              style={styles.inputForm}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              autoCompleteType='password'
            />
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => signIn()}>
              <Text style={{ fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress()}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  mainPageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screen.height,
    width: screen.width,
    backgroundColor: '#004AAD'
  },
  logo: {
    width: screen.width,
    height: screen.height / 4,
    marginTop: 35
  },
  userInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 25,
    marginBottom: 200,
    margin: 20,
    padding: 5,
  },
  logoContainer: {
    width: screen.width,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 25,
    padding: 10,
  },
  inputForm: {
    height: 50,
    width: screen.width / 1.5,
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 20,
  },
  optionsRow: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    padding: 5,
  },
});

export default Login;
