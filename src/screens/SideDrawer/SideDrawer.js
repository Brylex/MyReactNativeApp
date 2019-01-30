import React, { Component } from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import SideMenuItem from '../../components/UI/SideMenuItem/SideMenuItem';

class SideDrawer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SideMenuItem 
                    onPress={() => alert("Loggin out")} 
                    iconName={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"}>
                    Log out
                </SideMenuItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1,
    },
});

export default SideDrawer;