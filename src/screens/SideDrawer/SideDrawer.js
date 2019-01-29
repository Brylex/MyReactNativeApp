import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SideDrawer extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1,
    }
});

export default SideDrawer;