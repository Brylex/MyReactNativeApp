import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';

//Register Screens
Navigation.registerComponent("myReactNativeApp.AuthScreen", () => AuthScreen);
Navigation.registerComponent("myReactNativeApp.SharePlaceScreen", () => SharePlace);
Navigation.registerComponent("myReactNativeApp.FindPlaceScreen", () => FindPlace);

//Start App
Navigation.setRoot({
  root: {
    stack: {
      options: {},
      children: [
        {
          component: {
            name: 'myReactNativeApp.AuthScreen',
            options: {
              topBar: {
                title: {
                  text: 'Login',
                  fontSize: 20,
                }
              }
            },
          }
        }
      ],
      options: {}
    }
  }
})