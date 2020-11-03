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
              style={{width: screen.width}}
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/mobilecrm-e57c8.appspot.com/o/KeepContact.png?alt=media&token=9df42cb5-57d7-4dd3-a2e9-0fca2fc1816e',
              }}
            />
          </View>
          <View style={styles.userInfoContainer}>
            <Text>PLaceholder for UserIcon</Text>
            <TextInput
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
            <Text>PlaceHolder for PasswordIcon</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <View style={styles.optionsRow}>
              <Text>PlaceHolder for Help Button</Text>
              <Text>PlaceHolder for SignUp Button</Text>
            </View>
          </View>
          <View style={styles.loginButtonContainer}>
            <Text>Placeholder for LOGIN button</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  mainPageContainer: {
    flex: 1,
    height: screen.height,
    width: screen.width,
  },
  userInfoContainer: {
    width: screen.width / 1.3,
    height: screen.height / 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoContainer: {
    width: screen.width,
    height: screen.height / 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default App;
