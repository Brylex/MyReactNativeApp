import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import PlaceList from './src/components/PlaceList/PlaceList';
import ListInput from "./src/components/ListInput/ListInput";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import {addPlace, deletePlace, selectPlace, unselectPlace} from './src/store/actions/index'

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace} 
          onItemDeleted={this.props.onDeletePlace}
          onModalClosed={this.props.onUnselectPlace} />
        <ListInput placeAddHandler={(placeName => this.props.onAddPlace(placeName))} />
        <PlaceList 
          places={this.props.places} 
          onItemSelected={(key) => this.props.onSelectPlace(key)}/>
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

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace,
  }
}

const mapDisptchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onUnselectPlace: () => dispatch(unselectPlace()),
  }
}

export default connect(
  mapStateToProps,
  mapDisptchToProps
)(App);