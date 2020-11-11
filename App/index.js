import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import auth from '@react-native-firebase/auth';

export default App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  onAuthStateChanged = user => {
    setUser(user)
  };

  HomeScreen = ({ navigation }) => {
    return <Home navigation={navigation} user={user} />;
  }

  LoginScreen = ({ navigation }) => {
    return <Login navigation={navigation} user={user} setUser={setUser} />;
  }

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={auth()._user ? 'Home' : 'Login'} >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name={"Login"}
          options={{
            title: auth()._user ? 'Profile' : 'Login',
            headerShown: auth()._user ? true : false
          }}
          component={LoginScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
