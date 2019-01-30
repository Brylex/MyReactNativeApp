import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import SideMenuItem from '../../components/UI/SideMenuItem/SideMenuItem';

class SideDrawer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SideMenuItem onPress={() => alert("Loggin out")} iconName="sign-out-alt">
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