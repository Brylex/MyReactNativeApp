import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Header = props => (
    <Text 
        {...props}
        style={[style.header, props.style]}
    >
        {props.children}
    </Text>
)

const style = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: "bold",
    }
})

export default Header;
