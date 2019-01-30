import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';

import startTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Header from '../../components/UI/Header/Header';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        }

        Dimensions.addEventListener("change", this.updateStyles)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    updateStyles = (dims) => {
        this.setState({viewMode: dims.window.height > 500 ? "portrait" : "landscape",});        
    }

    loginHandler = () => {
        startTabs();
    }

    render() {
        const headingText = this.state.viewMode === "portrait" ? "Please Log In" : null;
        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.background}>
                    <MainText>
                        <Header>{headingText}</Header>
                    </MainText>
                    <ButtonWithBackground color="#2196F3" onPress={this.loginHandler}>Sign up</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput style={styles.input} placeholder="E-mail address" />
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer}>
                            <View style={
                                this.state.viewMode === "portrait" 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput style={styles.input} placeholder="Password" />
                            </View>
                            <View style={
                                this.state.viewMode === "portrait" 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput style={styles.input} placeholder="Confirm password" />
                            </View> 
                        </View>
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
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    landscapePasswordWrapper: {
        width: "49%",
    },
    portraitPasswordContainer: {
        flexDirection: "column",
    },
    portraitPasswordWrapper: {
        width: "100%",
    }
})

export default AuthScreen;