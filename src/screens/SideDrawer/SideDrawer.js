import React, { Component } from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';

import {authLogout} from '../../store/actions/index'

import SideMenuItem from '../../components/UI/SideMenuItem/SideMenuItem';

class SideDrawer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SideMenuItem 
                    onPress={this.props.onLogout} 
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout()),
    }
}

export default connect(
    null,
    mapDispatchToProps
)
(SideDrawer);