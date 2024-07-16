
import {SET_DATA, SET_BEFORE_IMAGE, SET_AFTER_IMAGE, SET_BEFORE_VIDEO, SET_AFTER_VIDEO} from "../actions";

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
                beforeVideo: null,
                beforeImage: action.payload
            }
        case SET_AFTER_IMAGE:
            return {
                ...state,
                afterVideo: null,
                afterImage: action.payload
            }
        case SET_BEFORE_VIDEO:
            return {
                ...state,
                beforeImage: null, 
                beforeVideo: action.payload

            }
        case SET_AFTER_VIDEO:
            return {
                ...state,
                afterImage: null,
                afterVideo: action.payload
            }
        default:
            return state;
    } 
}

export default reducer;