import { combineReducers } from 'redux';
import ReviewReducer from './review_reducer';


export default combineReducers({ // 本来はここで複数のReducerをひとまとめにする
  review: ReviewReducer, // `ReviewReducer`(review_reducer.js)を`review`とする
  // ホニャララ1: ホニャララReducer1,
  // ホニャララ2: ホニャララReducer2,
});