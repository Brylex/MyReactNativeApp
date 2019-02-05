import {SET_PLACES, DELETE_PLACE, ADD_PLACE} from '../actions/actionTypes';

const initalState = {
    places: []
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_PLACES: {
            return {
                ...state,
                places: action.places
            }
        }
        case ADD_PLACE: {
            return {
                ...state,
                places: state.places.concat({
                    id: action.id,
                    placeName: action.placeName,
                    image: action.image,
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