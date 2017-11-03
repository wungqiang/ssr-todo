import {
  GET_TODO
} from './constants.js';

const initialState = {info: {}, loaded: false};

export default function todoReducer(state = initialState, action) {
  switch(action.type) {
  case GET_TODO:
    return Object.assign({}, state, { info: action.data, loaded: true });
  default:
    return state;
  }
}
