import {Navigation} from 'react-native-navigation';

const startTabs = () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        component: {
                            name: 'myReactNativeApp.FindPlaceScreen',
                            options: {
                                bottomTab: {
                                    text: 'Share Place',
                                },
                                topBar: {
                                    title: {
                                      text: 'Share Place',
                                      fontSize: 20,
                                    }
                                  }
                            }
                        }
                    },
                    {
                        component: {
                            name: 'myReactNativeApp.FindPlaceScreen',
                            options: {
                                bottomTab: {
                                    text: 'Find Place',
                                },
                                topBar: {
                                    title: {
                                      text: 'Find Place',
                                      fontSize: 20,
                                    }
                                  }
                            }
                        }
                    }
                ],
                options: {}
            }
        }
    }
)}

export default startTabs;