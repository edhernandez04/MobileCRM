import * as React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native'

export default Home = props => {
    console.log(props.user)
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