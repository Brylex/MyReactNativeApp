import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("share-square", 30),
        Icon.getImageSource("map", 30),
        Icon.getImageSource("bars", 30),
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
                                                name: 'myReactNativeApp.SharePlaceScreen',
                                                options: {
                                                    bottomTab: {
                                                        text: 'Share Place',
                                                        fontSize: 12,
                                                        icon: sources[0]
                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Share Place',
                                                            fontSize: 20,
                                                        },
                                                        leftButtons: [{
                                                            id: "drawer-button",
                                                            icon: sources[2],
                                                            text: "Menu"
                                                        }]
                                                    },
                                                }
                                            }
                                        }]
                                    }
                                },{
                                    stack: { 
                                        children: [{
                                            component: {
                                                name: 'myReactNativeApp.FindPlaceScreen',
                                                options: {
                                                    bottomTab: {
                                                        text: 'Find Place',
                                                        fontSize: 12,
                                                        icon: sources[1],
                                                    },
                                                    topBar: {
                                                        title: {
                                                            text: 'Find Place',
                                                            fontSize: 20,
                                                        },
                                                        leftButtons: [{
                                                            id: "drawer-button",
                                                            icon: sources[2],
                                                            text: "Menu"
                                                        }]
                                                    }
                                                }
                                            }
                                        }]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        })
    })
}

export default startTabs;