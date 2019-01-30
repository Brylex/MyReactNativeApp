import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SideMenuItem = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.menuItem}>
            <Icon name={props.iconName} size={30} />
            <Text style={styles.text}>{props.children}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1,
    },
    menuItem: {
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#eee",
        borderBottomColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: "bold",
    },
});

export default SideMenuItem;