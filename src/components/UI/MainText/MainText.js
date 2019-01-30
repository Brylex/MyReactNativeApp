import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MainText = props => (
    <Text style={style.mainText}>{props.children}</Text>
)

const style = StyleSheet.create({
    mainText: {
        color: "#fff",
        backgroundColor: "transparent",
    }
})

export default MainText;