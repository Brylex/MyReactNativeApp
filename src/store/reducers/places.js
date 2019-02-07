import {SET_PLACES, DELETE_PLACE, PLACE_ADDED, RESET_PLACE_ADDED_FLAG} from '../actions/actionTypes';

const initalState = {
    places: [],
    placeAdded: false,
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_PLACES: {
            return {
                ...state,
                places: action.places
            }
        }
        case PLACE_ADDED: {
            return {
                ...state,
                places: state.places.concat({
                    id: action.id,
                    placeName: action.placeName,
                    image: action.image,
                    location: action.location,
                }),
                placeAdded: true,
            }
        }
        case RESET_PLACE_ADDED_FLAG:
            return {
                ...state,
                placeAdded: false,
            }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => place.id !== action.id)
            }
        }
        default:
            return state;
    }
};

export default reducer;