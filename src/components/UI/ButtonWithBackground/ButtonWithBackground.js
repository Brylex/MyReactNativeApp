import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform} from 'react-native';

const ButtonWithBackground = props => {
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
            <Text style={styles.text} >{props.children}</Text>
        </View>
    )
    if (props.disabled) {
        return content;
    }
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}            
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: "60%",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    disabled: {
        backgroundColor: "#6ab8f7",
    },
})

export default ButtonWithBackground