import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes'
import placeImage from '../../../src/assets/bled.jpg';

const initalState = {
    places: []
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
                    location: action.location,
                })
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => place.key !== action.placeKey)
            }
        }
        default:
            return state;
    }
};

export default reducer;