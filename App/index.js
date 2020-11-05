import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {firebaseConfig} from '../Setup';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [signUpVisible, setSignUpVisible] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  GoogleSignin.configure({
    webClientId: firebaseConfig.webClientId,
  });

  onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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
              <Text>🎃</Text>
              <TextInput
                style={styles.inputForm}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
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
              />
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity>
                <Text style={{fontSize: 18}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => signIn()}
                    disabled={initializing}
                  />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  mainPageContainer: {
    justifyContent: 'space-between',
    height: screen.height,
    width: screen.width,
    backgroundColor: '#004AAD',
  },
  logo: {
    width: screen.width,
    height: screen.height / 4,
    justifyContent: 'center',
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

export default App;
