import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from '../ListItem/ListItem';

const PlaceList = (props) => {
    return (
        <FlatList 
            style={styles.listContainer}
            data={props.places}
            renderItem={(info) => (
                <ListItem 
                    key={info.item.id}
                    placeName={info.item.placeName}
                    placeImage={info.item.image}
                    onItemPressed={() => props.onItemSelected(info.item.id)} />
            )} 
            keyExtractor={(item, index) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%",
    },
});

export default PlaceList;