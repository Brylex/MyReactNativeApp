import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';

import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Header from '../../components/UI/Header/Header';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from "../../assets/background.jpg";
import validate from '../../utility/validation';
import {tryAuth} from '../../store/actions/index';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
            authMode: "login",
            controls: {
                email: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmail: true,
                    },
                    touched: false,
                },
                password: {
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 6,
                    },
                    touched: false,
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: "password",
                    },
                    touched: false,
                },
            }
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
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        }
        this.props.onLogin(authData);
        startTabs();
    }

    switchAuthMode = () => {
        this.setState((prevState) => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login",
            }
        })
    }

    updateInputState = (key, val) => {
        let connectedValues = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const controlName = this.state.controls[key].validationRules.equalTo
            const controlValue = this.state.controls[controlName].value
            connectedValues = {
                ...connectedValues,
                equalTo: controlValue,
            }
        }
        if (key === "password") {
            connectedValues = {
                ...connectedValues,
                equalTo: val,
            }
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === "password" 
                            ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValues)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules, connectedValues),
                        touched: true,
                    },
                    
                }
            }
        })
    }

    

    render() {
        const headingText = this.state.viewMode === "portrait" ? "Please Log In" : null;
        const isSubmitButtonDisabled = !this.state.controls.password.valid || 
            !this.state.controls.email.valid || 
            (!this.state.controls.confirmPassword.valid && this.state.authMode === "signup")

        return (
            <KeyboardAvoidingView style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.background}>
                    <MainText>
                        <Header>{headingText}</Header>
                    </MainText>
                    <ButtonWithBackground 
                        color="#2196F3" 
                        onPress={this.switchAuthMode}
                    >
                        {this.state.authMode === "login" ? "Switch to Sign up" : "Switch to Login"}
                    </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            style={styles.input} 
                            placeholder="E-mail address"
                            value={this.state.controls.email.value}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            onChangeText={(val) => this.updateInputState("email", val)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address" />
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer}>
                            <View style={
                                this.state.viewMode === "portrait" || this.state.authMode === "login"
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Password"
                                    value={this.state.controls.password.value}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    onChangeText={(val) => this.updateInputState("password", val)}
                                    secureTextEntry />
                            </View>
                            {this.state.authMode === "signup"
                                ? <View style={
                                    this.state.viewMode === "portrait" 
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper}>
                                    <DefaultInput 
                                        style={styles.input} 
                                        placeholder="Confirm password"
                                        value={this.state.controls.confirmPassword.value}
                                        valid={this.state.controls.confirmPassword.valid}
                                        touched={this.state.controls.confirmPassword.touched}
                                        onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                                        secureTextEntry />
                                </View> 
                                : null
                            }
                        </View>
                    </View>
                    <ButtonWithBackground  
                        color="#2196F3" 
                        onPress={this.loginHandler}
                        disabled={isSubmitButtonDisabled} 
                    >
                        Submit
                    </ButtonWithBackground>
                </ImageBackground>
            </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AuthScreen);