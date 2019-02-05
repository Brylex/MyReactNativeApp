import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import MapView from 'react-native-maps';

import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    constructor(props) {
        super(props);

        Navigation.events().registerNavigationButtonPressedListener(this.placeDeteledHandler);
    }
    
    placeDeteledHandler = event => {
        if (event.buttonId === "delete-location-btn" && event.componentId === this.props.componentId) {
            this.props.onDeletePlace(this.props.selectedPlace.key);
            Navigation.pop(this.props.componentId);
        }        
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
                    <Text style={styles.placeName}>{this.props.selectedPlace.placeName}</Text>
                    <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
                    <MapView style={styles.map} initialRegion={location}>
                        <MapView.Marker coordinate={location} />
                    </MapView>
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
        marginBottom: 10,
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