import React, { useState } from 'react'
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
    Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export default SignUpForm = props => {
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()
    const [password, setNewPassword] = useState()

    const updateUserInformation = async () => {
        if (displayName) await auth().updateProfile({ displayName: "Jane Q. User" })
        if (email) await auth().updateEmail(email)
        if (password) await auth().updatePassword(password)
    }

    const getImage = () => {
        const imagePickerOptions = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = decodeURI(response.uri);
                const reference = storage().ref(source);
                const pathToFile = source;
                await reference.putFile(pathToFile);
                const url = await storage().ref(source).getDownloadURL();
                await auth().updateProfile({ photoURL: url })
            }
        });
    };

    return (
        <>
            <View style={styles.profileInformation}>
                <TouchableOpacity onPress={() => getImage()}>
                    <Image source={{ uri: auth()._user.photoURL }} style={styles.profileImage} />
                </TouchableOpacity>
                <Text>{auth()._user.displayName}</Text>
                <View style={styles.userInfoContainer}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.inputForm}
                            placeholder="Display Name"
                            onChangeText={setDisplayName}
                            value={displayName}
                            autoCompleteType='name'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.inputForm}
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                            autoCompleteType='email'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.inputForm}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={setNewPassword}
                            value={password}
                            autoCompleteType='password'
                        />
                    </View>
                    <View>
                        <Button title='Update' onPress={() => updateUserInformation()} />
                    </View>
                </View>
                <View>
                    <Button title='Sign Out' onPress={() => signOut()} color="#dc143c" />
                </View>
            </View>

        </>
    )
}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    profileImage: { height: screen.height / 8, width: screen.width / 4, borderRadius: 50, margin: 10 },
    profileInformation: { alignItems: 'center', height: screen.height, width: screen.width, backgroundColor: '#dcdcdc' },
    userInfoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 25,
        margin: 20,
        padding: 5,
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
        width: screen.width / 1.5,
        alignItems: 'center',
        fontSize: 18,
        marginLeft: 20,
    },
});