import React, {Component} from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeAnimation: new Animated.Value(1),
        }

        Navigation.events().registerNavigationButtonPressedListener(this.navigationButtonPressed);
        Navigation.events().registerComponentDidDisappearListener(this.onSideMenuClosed);
    }

    navigationButtonPressed = event => {
        if (event.buttonId === "drawer-button" && event.componentId === this.props.componentId) {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                  left: {
                    visible: true
                  }
                }
              });
        }
    }

    onSideMenuClosed = event => {
        if (event.componentName === "myReactNativeApp.SideDrawerScreen") {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                  left: {
                    visible: false
                  }
                }
              });
        }
    }

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => place.key === key);

        Navigation.push(this.props.componentId, {
            component: {
                name: "myReactNativeApp.PlaceDetailsScreen",
                passProps: {
                    selectedPlace: selectedPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selectedPlace.name,
                        }
                    }
                }
            }
        })
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        //this.setState({loaded: true});
    }

    render() {
        const content = !this.state.loaded
            ? (
                <Animated.View style={{
                    opacity: this.state.removeAnimation,
                    transform: [{
                        scale: this.state.removeAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }]
                }}>
                    <TouchableOpacity onPress={this.placesSearchHandler}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Load places</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <ButtonWithBackground color="#2196F3" onPress={this.placesSearchHandler}>Load places</ButtonWithBackground> */}
                </Animated.View>
            )
            : (<PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>)

        return (
            <View style={this.state.loaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#2196F3",
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(
    mapStateToProps
)(FindPlace)