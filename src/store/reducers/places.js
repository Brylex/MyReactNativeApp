import {ADD_PLACE, DELETE_PLACE, SELECT_PLACE, UNSELECT_PLACE} from '../actions/actionTypes'
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
        case SELECT_PLACE: {
            return {
                ...state,
                selectedPlace: state.places.find(place => place.key === action.placeKey)
            }
        }
        case UNSELECT_PLACE: {
            return {
                ...state,
                selectedPlace: null,
            }
        }
        default:
            return state;
    }
};

export default reducer;