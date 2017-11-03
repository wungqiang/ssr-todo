import { ADD_TODO, EDIT_TODO } from './constants';
import Request from '../../services/request';
let server = 'http://localhost:3000';

export const submitTodo = (content) => {
  return new Promise((resolve, reject) => {
    Request(`${server}/api/todo`, {
      method: 'POST',
      body: 'content=' + content
    }).then((data) => {
      if (data.succ) {
        resolve(data.data);
      } else {
        reject({ msg: data.msg || 'add failed' });
      }
    }, reject);
  });
};

export const getEditTodo = (id) => {
  return new Promise((resolve, reject) => {
    Request(`${server}/api/todo/${id}`).then((data) => {
      if (data.succ) {
        resolve(data.data);
      } else {
        reject({msg: data.msg || '获取数据异常'});
      }
    }, (err) => {
      resolve(null);
    });
  });
};

export const submitEditTodo = (id, content) => {
  return new Promise((resolve, reject) => {
    Request(`${server}/api/todo/${id}`, {
      method: 'PUT',
      body: 'content=' + content
    }).then((data) => {
      if (data.succ) {
        resolve();
      } else {
        reject({ msg: data.msg || 'add failed' });
      }
    }, reject);
  });
};
