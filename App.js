import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux"

import AuthScreen from './src/screens/Auth/Auth'
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/store';

const store = configureStore();

//Register Screens
Navigation.registerComponent("myReactNativeApp.AuthScreen", () => (props) => (
  <Provider store={store}>
    <AuthScreen {...props} />
  </Provider>
), () => AuthScreen);
Navigation.registerComponent("myReactNativeApp.SharePlaceScreen", () => (props) => (
  <Provider store={store}>
    <SharePlace {...props} />
  </Provider>
), () => SharePlace);
Navigation.registerComponent("myReactNativeApp.FindPlaceScreen", () => (props) => (
  <Provider store={store}>
    <FindPlace {...props} />
  </Provider>
), () => FindPlace);
Navigation.registerComponent("myReactNativeApp.PlaceDetailsScreen", () => (props) => (
  <Provider store={store}>
    <PlaceDetail {...props} />
  </Provider>
), () => PlaceDetail);
Navigation.registerComponent("myReactNativeApp.SideDrawerScreen", () => SideDrawer);

//Start App
Navigation.setRoot({
  root: {
    stack: {
      children: [{
          component: {
            name: 'myReactNativeApp.AuthScreen',
            options:{
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              }
            }
          }
      }],
    }
  }
})