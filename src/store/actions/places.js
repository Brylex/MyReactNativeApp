import {SET_PLACES, ADD_PLACE, DELETE_PLACE} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let uploadedImage = null;

        dispatch(uiStartLoading());
        fetch("https://us-central1-myreactnativeapp-1548941530901.cloudfunctions.net/storeImage", {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());            
        })
        .then(response => response.json())
        .then(parsedResponse => {
            uploadedImage = {
                uri: parsedResponse.imageUrl
            };

            const placeData = {
                placeName: placeName,
                location: location,
                image: parsedResponse.imageUrl
            }
            return fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());            
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            dispatch(uiStopLoading());
            dispatch({
                type: ADD_PLACE,
                id: json.name,
                placeName: placeName,
                location: location,
                image: uploadedImage
            });     
        })
    }
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places.json")
        .catch(err => console.log(err))
        .then(response => response.json())
        .then(places => {
            const mappedPlaces = [];
            for (let key in places) {
                mappedPlaces.push({
                    ...places[key],
                    id: key,
                    image: {
                        uri: places[key].image
                    }
                })
            }
            dispatch(setPlaces(mappedPlaces))
        });
    }
}

export const deletePlace = id => {
    return dispatch => {
        fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places/" + id + ".json", {
            method: "DELETE",
        })
        .catch(err => console.log(err))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_PLACE,
                    id: id
                })
            } else {
                console.log("Failed to delete record. Id: " + id);
            }
        });
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places,
    }
}