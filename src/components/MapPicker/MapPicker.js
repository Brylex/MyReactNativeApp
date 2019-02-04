import React, {Component} from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class MapPicker extends Component {
    state = {
        location: {
            latitude: 51.2472703,
            longitude: 22.5667477,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
        },
        showLocationMarker: false,
    }

    pickLocationHandler = event => {
        const newLocation = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.location,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
        })

        this.setState(prevState => {
            return {
                location: {
                    ...prevState.location,
                    latitude: newLocation.latitude,
                    longitude: newLocation.longitude,
                },
                showLocationMarker: true,
            }
        });

        this.props.onLocationSelected({
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
        })
    }

    getLocationhandler = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coordinatesEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                        }
                    }
                };

                this.pickLocationHandler(coordinatesEvent);
            },
            err => {
                console.log(err);
                alert("Fetching positions failed. Select your position manually.")
            }
        );
    }

    render() {
        const marker = this.state.showLocationMarker
            ? <MapView.Marker coordinate={this.state.location} />
            : null;

        return (
            <View style={styles.container}>
                <MapView 
                    onPress={this.pickLocationHandler}
                    initialRegion={this.state.location}
                    style={styles.map}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate me!" onPress={this.getLocationhandler}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: 250,
    },
    button: {
        margin: 8,
    },
})

export default MapPicker;