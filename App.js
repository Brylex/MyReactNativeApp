import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import PlaceList from './src/components/PlaceList/PlaceList';
import ListInput from "./src/components/ListInput/ListInput";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import placeImage from './src/assets/bled.jpg';

export default class App extends Component {
  state = {
    places: [],
    selectedPlace : null,
  };

  placeAddHandler = (place) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(), 
          name: place,
          image: placeImage,
        })
      }
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find((place) => place.key === key)
      }
    });
  };

  placeDeleteHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place) => place.key !== prevState.selectedPlace.key),
        selectedPlace: null,
      }
    });
  };

  onModalCloseHandler = () => {
    this.setState({selectedPlace: null});
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeleteHandler}
          onModalClosed={this.onModalCloseHandler} />
        <ListInput placeAddHandler={this.placeAddHandler} />
        <PlaceList 
          places={this.state.places} 
          onItemSelected={this.placeSelectedHandler}/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
});