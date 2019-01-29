import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Navigation } from 'react-native-navigation';

import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    placeDeteledHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <View style={styles.deleteButton} >
                        <TouchableOpacity onPress={this.placeDeteledHandler}>
                            <Icon size={30} name="trash-alt" color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
    },
    placeImage: {
        width: "100%",
        height: 200,
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
    },
    deleteButton: {
        alignItems: "center",
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key)),
    };
}

export default connect(
    null,
    mapDispatchToProps
)(PlaceDetail);