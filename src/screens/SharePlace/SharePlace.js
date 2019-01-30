import React, {Component} from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import MapPicker from '../../components/MapPicker/MapPicker';
import MainText from '../../components/UI/MainText/MainText';
import Header from '../../components/UI/Header/Header';

class SharePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeName: "",
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

    placeNameChangeHandler = (text) => {
        this.setState({placeName: text});
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() !== "") {
            this.props.onAddPlace(this.state.placeName);
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <Header style={styles.header}>Share a place</Header>
                    </MainText>
                    <ImagePicker />
                    <MapPicker />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangeHandler} />
                    <View style={styles.button}>
                        <Button title="Share the place!" onPress={this.placeSubmitHandler}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
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