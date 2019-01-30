import React, {Component} from 'react';
import {View, StyleSheet, Button, ImageBackground} from 'react-native';

import startTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Header from '../../components/UI/Header/Header';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
    loginHandler = () => {
        startTabs();
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.background}>
                    <MainText>
                        <Header>Please Log In</Header>
                    </MainText>
                    <ButtonWithBackground color="#2196F3" onPress={this.loginHandler}>Sign up</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput style={styles.input} placeholder="E-mail address" />
                        <DefaultInput style={styles.input} placeholder="Password" />
                        <DefaultInput style={styles.input} placeholder="Confirm password" />
                    </View>
                    <ButtonWithBackground color="#2196F3" onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "#bbb",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "#eeed",
        borderColor: "#bbb",
    },
    background: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default AuthScreen;