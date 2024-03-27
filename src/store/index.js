import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    doneLoading: false,
    beforeImage: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    afterImage: 'https://www.shutterstock.com/image-photo/cat-love-holds-flower-his-600nw-622118159.jpg'
}
export const store = createStore(reducer, initialState);