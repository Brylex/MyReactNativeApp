import React, {Component} from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlace extends Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/> 
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(
    mapStateToProps
)(FindPlace)