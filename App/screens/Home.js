import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import auth from '@react-native-firebase/auth';

export default Home = props => {
    useEffect(() => {
        if (!auth()._user) props.navigation.navigate('Login')
    })
    return (
        <>
            <SafeAreaView>
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text>HELLO WORLD!</Text>
                </View>
            </SafeAreaView>
        </>
    )
}