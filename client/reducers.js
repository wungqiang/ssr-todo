import { combineReducers } from 'redux';
import home from './containers/HomePage/reducer';
import todo from './containers/DetailPage/reducer';

const rootReducer = combineReducers({
  home,
  todo
});

export default rootReducer;
