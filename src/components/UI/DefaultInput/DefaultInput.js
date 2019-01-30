import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const DefaultInput = props => (
    <TextInput 
        underlineColorAndroid="transparent"
        {...props}
        style={[style.input, props.style]}
    />
)

const style = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        margin: 8,
    }
})

export default DefaultInput;