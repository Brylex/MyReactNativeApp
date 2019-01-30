import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: "myReactNativeApp.SideDrawerScreen",
                        },
                        visible: false,
                    },
                    center: {
                        bottomTabs: {
                            children: [{
                                    stack: { 
                                        children: [{
                                            component: {
                                                name: 'myReactNativeApp.FindPlaceScreen',
                                                options: {
                                                    bottomTab: {
                                                        text: 'Find Place',
                                                        fontSize: 12,
                                                        icon: sources[1],
                                                        selectedIconColor: "orange",
                                                        selectedTextColor: "orange",
                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Find Place',
                                                            fontSize: 20,
                                                        },
                                                        leftButtons: [{
                                                            id: "drawer-button",
                                                            icon: sources[2],
                                                            text: "Menu",
                                                            color: "#2196F3",
                                                        }]
                                                    }
                                                }
                                            }
                                        }],
                                        options: {
                                            bottomTab: {
                                                selectedIconColor: "#2196F3",
                                                selectedTextColor: "#2196F3",
                                            }
                                        }
                                    }
                                },{ 
                                    stack: {
                                        children: [{
                                            component: {
                                                name: 'myReactNativeApp.SharePlaceScreen',
                                                options: {
                                                    bottomTab: {
                                                        text: 'Share Place',
                                                        fontSize: 12,
                                                        icon: sources[0],

                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Share Place',
                                                            fontSize: 20,
                                                        },
                                                        leftButtons: [{
                                                            id: "drawer-button",
                                                            icon: sources[2],
                                                            text: "Menu",
                                                            color: "orange",
                                                        }]
                                                    },
                                                }
                                            }
                                        }],
                                        options: {
                                            bottomTab: {
                                                selectedIconColor: "#2196F3",
                                                selectedTextColor: "#2196F3",
                                            }
                                        }
                                    }
                                }
                            ],
                        }
                    }
                }
            }
        })
    })
}

export default startTabs;