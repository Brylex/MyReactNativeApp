import React, {Component} from 'react';
import { ScrollView, View, Button, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import { addPlace, resetPlaceAddedFlag } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import ImageSelector from '../../components/ImageSelector/ImageSelector';
import MapPicker from '../../components/MapPicker/MapPicker';
import MainText from '../../components/UI/MainText/MainText';
import Header from '../../components/UI/Header/Header';
import validate from '../../utility/validation';

class SharePlace extends Component {
    constructor(props) {
        super(props);

        Navigation.events().registerNavigationButtonPressedListener(this.onNavigationButtonPressed);
        Navigation.events().registerComponentDidDisappearListener(this.onSideMenuClosed);
        Navigation.events().registerBottomTabSelectedListener(this.tabSelected);
    }

    componentWillMount() {
        this.reset();
    }

    componentDidUpdate() {
        if (this.props.isPlaceAdded) {
            Navigation.mergeOptions('MainTabLayout', {
                bottomTabs: {
                  currentTabIndex: 0
                }
              });
        }
    }

    tabSelected = event => {
        if (event.selectedTabIndex === 1) {
            this.props.resetPlaceAddedFlag();
        }
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
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    };

    reset = () => {
        this.setState({
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
        })
    }

    render() {
        const submitBtn = !this.props.isLoading
            ? <Button 
                title="Share the place!"
                onPress={this.placeSubmitHandler}
                disabled={!this.state.controls.placeName.valid 
                    || !this.state.controls.location.valid
                    || !this.state.controls.image.valid
                    || this.props.isLoading} />
            : <View style={styles.progress}>
                <Text>Uploading...</Text>
                <ActivityIndicator />
              </View>

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
                    <ImageSelector 
                        onImagePicked={this.imagePickedHandler}
                        ref={ref => (this.imagePicker = ref)} />
                    <MapPicker 
                        onLocationSelected={this.locationSelectedHandler}
                        ref={ref => (this.locationPicker = ref)} />
                    <View style={styles.button}>
                        {submitBtn}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        resetPlaceAddedFlag: () => dispatch(resetPlaceAddedFlag()),
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        isPlaceAdded: state.places.placeAdded,
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
    },
    progress: {
        flexDirection: "row"
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SharePlace);