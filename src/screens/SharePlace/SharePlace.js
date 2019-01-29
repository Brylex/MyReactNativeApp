import React, {Component} from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation';

class SharePlace extends Component {
    constructor(props) {
        super(props);

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

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render() {
        return (
            <View>
                <PlaceInput placeAddHandler={this.placeAddedHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(
    null, 
    mapDispatchToProps
)(SharePlace);