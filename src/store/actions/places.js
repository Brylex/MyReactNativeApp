import {SET_PLACES, PLACE_ADDED, DELETE_PLACE, RESET_PLACE_ADDED_FLAG} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui';
import {authGetToken} from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let idToken = null;

        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .then(token => {
            idToken = token;

            return fetch("https://us-central1-myreactnativeapp-1548941530901.cloudfunctions.net/storeImage", {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    authorization: "Bearer " + token
                }
            })
        })        
        .catch(() => alert("No valid token found in store."))
        .then(response => response.json())
        .then(parsedResponse => {
            uploadedImage = {
                uri: parsedResponse.imageUrl
            };
            console.log(parsedResponse);
            const placeData = {
                placeName: placeName,
                location: location,
                image: parsedResponse.imageUrl,
                imagePath: parsedResponse.imagePath,
            };
            return fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places.json?auth=" + idToken, {
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
                type: PLACE_ADDED,
                id: json.name,
                placeName: placeName,
                location: location,
                image: uploadedImage
            });
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());            
        });
    }
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places.json?auth=" + token)
        })
        .catch(() => alert("No valid token found in store."))
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
        })
        .catch(err => console.log(err));
    }
}

export const deletePlace = id => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch("https://myreactnativeapp-1548941530901.firebaseio.com/places/" + id + ".json?auth=" + token, {
                method: "DELETE",
            })
        })
        .catch(() => alert("No valid token found in store."))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_PLACE,
                    id: id
                })
            } else {
                console.log("Failed to delete record. Id: " + id);
            }
        })
        .catch(err => console.log(err));
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places,
    }
}

export const resetPlaceAddedFlag = () => {
    return {
        type: RESET_PLACE_ADDED_FLAG,
    }
}