import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem} >
            <Image style={styles.placeImage} source={props.placeImage}/>
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        marginBottom: 5,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
    },
    placeImage: {
        height: 30,
        width: 30,
        margin: 5,
    }
});

export default ListItem;