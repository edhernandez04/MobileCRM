import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';

function HomeScreen({ navigation, route }) {
  return <Home navigation={navigation} user={route.params.user}/>;
}

function LoginScreen({ navigation, route }) {
  return <Login navigation={navigation} user={route.params.user}/>;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={'Login'}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ title: 'Welcome' }} initialParams={{ user: null }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
