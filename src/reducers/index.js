
import {SET_DATA, SET_BEFORE_IMAGE, SET_AFTER_IMAGE} from "../actions";

function reducer(state, action) {
    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                doneLoading: true

            }
        case SET_BEFORE_IMAGE:
            return {
                ...state,
                beforeImage: action.payload
            }
        case SET_AFTER_IMAGE:
            return {
                ...state,
                afterImage: action.payload
            }
        default:
            return state;
    } 
}

export default reducer;