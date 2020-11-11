import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export default ProfileCard = () => {
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setNewPassword] = useState()
    const [updateForm, toggleUpdateForm] = useState(false)

    const updateUserInformation = async () => {
        if (displayName) await firebase.User.updateProfile({ displayName: displayName })
        if (email) await firebase.User.updateEmail(email)
        if (password) await firebase.User.updatePassword(password)
        toggleUpdateForm(false)
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

    signOut = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <View style={styles.profileInformation}>
                <TouchableOpacity onPress={() => getImage()}>
                    <Image source={{ uri: auth()._user.photoURL }} style={styles.profileImage} />
                </TouchableOpacity>
                <Text>{auth()._user.displayName}</Text>
                    {updateForm ? <View style={styles.userInfoContainer}>
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
                                placeholder="Phone Number"
                                onChangeText={setPhoneNumber}
                                value={phoneNumber}
                                autoCompleteType='tel'
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
                            <Button title='Save' onPress={() => updateUserInformation()} />
                        </View>
                    </View>
                        : <View>
                            <Button title='Update Profile' onPress={() => toggleUpdateForm(true)} />
                        </View>
                    }
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