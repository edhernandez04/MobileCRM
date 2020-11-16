import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging';

export default Chat = props => {

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }, []);

    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    return (
        <>
            <SafeAreaView>
                <View>
                    <Text>HELLO WORLD!</Text>
                </View>
            </SafeAreaView>
        </>
    )
}