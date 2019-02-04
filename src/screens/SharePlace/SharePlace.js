import React, {Component} from 'react';
import { ScrollView, View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import ImageSelector from '../../components/ImageSelector/ImageSelector';
import MapPicker from '../../components/MapPicker/MapPicker';
import MainText from '../../components/UI/MainText/MainText';
import Header from '../../components/UI/Header/Header';
import validate from '../../utility/validation';

class SharePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true,
                    }
                },
                location: {
                    value: null,
                    valid: false,
                },
                image: {
                    value: null,
                    valid: false,
                }
            }
        }

        Navigation.events().registerNavigationButtonPressedListener(this.onNavigationButtonPressed);
        Navigation.events().registerComponentDidDisappearListener(this.onSideMenuClosed);
    }

    onNavigationButtonPressed = event => {
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

    placeNameChangeHandler = (val) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName:  {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules, null),
                        touched: true,
                    }
                }
            }
        });
    };

    locationSelectedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true,
                    }
                }
            }
        })
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true,
                    }
                }
            }
        })
    }

    placeSubmitHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value,
        );
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <Header style={styles.header}>Share a place</Header>
                    </MainText>
                    <PlaceInput 
                        onChangeText={this.placeNameChangeHandler}
                        value={this.state.controls.placeName.value}
                        valid={this.state.controls.placeName.valid}
                        touched={this.state.controls.placeName.touched} />
                    <ImageSelector onImagePicked={this.imagePickedHandler} />
                    <MapPicker onLocationSelected={this.locationSelectedHandler}/>
                    <View style={styles.button}>
                        <Button 
                            title="Share the place!" 
                            onPress={this.placeSubmitHandler}
                            disabled={!this.state.controls.placeName.valid 
                                || !this.state.controls.location.valid
                                || !this.state.controls.image.valid} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        margin: 8,
    },
    header: {
        color: "black",
    }
})

export default connect(
    null, 
    mapDispatchToProps
)(SharePlace);