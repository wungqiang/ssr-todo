import Request from '../../services/request';
import { GET_TODO } from './constants';
let server = 'http://localhost:3000';

export const getTodo = (id) => (dispatch) => {
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
  }).then((data) => {
    dispatch({ type: GET_TODO, data: data });
  });
};
