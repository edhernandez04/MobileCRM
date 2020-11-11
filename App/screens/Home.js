import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native'

export default Home = props => {
    console.log(props.user)
    useEffect(() => {
        if (props.user === null || props.user === undefined) props.navigation.navigate('Login')
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