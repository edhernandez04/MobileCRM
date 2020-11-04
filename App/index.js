import React, {useState} from 'react';
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

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mainPageContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={{
                width: screen.width,
                height: screen.height / 4,
                justifyContent: 'center',
              }}
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
                <Text style={{fontSize: 18}}>⚙️</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 25,
                    padding: 5,
                  }}>
                  <Text style={{fontSize: 18, color: 'white'}}>Sign Up ⇢</Text>
                </View>
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
  userInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginButtonContainer: {},
});

export default App;
