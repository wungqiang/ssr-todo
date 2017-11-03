import Request from '../../services/request';
import {
  GET_TODOS,
  REMOVE_TODO,
  ADD_TODO,
  EDIT_TODO
} from './constants';
let server = 'http://localhost:3000';

export const getTodos = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    Request(`${server}/api/todo`).then((data) => {
      resolve(data.succ ? data.data : []);
      if (data.succ) {
        resolve(data.data);
      } else {
        // TODO: handle error
        resolve([]);
      }
    }, (err) => {
      // TODO: handle error
      resolve([]);
    });
  }).then((data) => {
    dispatch({ type: GET_TODOS, data: data });
  });
};

export const removeTodo = (id) => {
  return { type: REMOVE_TODO, data: id };
}

export const addTodo = (modal) => {
  return { type: ADD_TODO, data: modal };
};

export const editTodo = (modal) => {
  return { type: EDIT_TODO, data: modal };
};


export const submitRemoveTodo = (id) => {
  return new Promise((resolve, reject) => {
    Request(`${server}/api/todo/${id}`, {
      method: 'DELETE'
    }).then(resolve, reject);
  });
};
