import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes'
import placeImage from '../../../src/assets/bled.jpg';

const initalState = {
    places: [],
    selectedPlace : null,
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(), 
                    name: action.placeName,
                    image: placeImage,
                })
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => place.key !== state.selectedPlace.key),
                selectedPlace: null,
            }
        }
        default:
            return state;
    }
};

export default reducer;