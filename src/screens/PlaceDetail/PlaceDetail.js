import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import MapView from 'react-native-maps';

import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    placeDeteledHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
    }
    
    render() {
        const location = {
            latitude: this.props.selectedPlace.location.latitude,
            longitude: this.props.selectedPlace.location.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
        };

        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
                    <MapView style={styles.map} initialRegion={location}>
                        <MapView.Marker coordinate={location} />
                    </MapView>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <View style={styles.deleteButton} >
                        <TouchableOpacity onPress={this.placeDeteledHandler}>
                            <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red" />
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
    map: {
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