import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const ButtonWithBackground = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text style={styles.text} >{props.children}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    }
})

export default ButtonWithBackground