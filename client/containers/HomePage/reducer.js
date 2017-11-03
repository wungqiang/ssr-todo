import {
  GET_TODOS,
  REMOVE_TODO,
  ADD_TODO,
  EDIT_TODO
} from './constants';

const initialState = { list: [], loadedList: false };

export default function homeReducer(state = initialState, action) {
  let list;
  switch(action.type) {
  case ADD_TODO:
    list = state.list.slice();
    list = list.concat(action.data);
    return Object.assign({}, state, { list: list});
  case EDIT_TODO:
    list = state.list.slice();
    list.forEach((item, index) => {
      if (item.id == action.data.id) {
        item.content = action.data.content
      }
    });
    return Object.assign({}, state, { list: list});
  case REMOVE_TODO:
    list = state.list.slice();
    list.forEach((item, index) => {
      if (item.id == action.data) {
        list.splice(index, 1);
      }
    });
    return Object.assign({}, state, { list: list});
  case GET_TODOS:
    return Object.assign({}, state, { list: action.data, loadedList: true });
  default:
    return state;
  }
}
