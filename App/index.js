import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';

const [user, setUser] = useState(null);

function HomeScreen({navigation}) {
  return <Home navigation={navigation} user={user} setUser={setUser} />;
}

function LoginScreen({navigation}) {
  return <Login navigation={navigation} />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
