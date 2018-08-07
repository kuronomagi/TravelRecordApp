import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
} from '../actions/types';

const INITIAL_STATE = { // 初期データ
  allReviews: [], // `allReviews`は最初、空の配列とする
  detailReview: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_REVIEWS:
      return { ...state, allReviews: action.payload }; // `state`の`allReviews`項目を上書きして返す(「既存の内容を全コピ(`...state`のこと)した上で該当項目だけを最新情報に更新(`allReviews: action.payload`のこと)したstate」を新たに作って返す)

    case SELECT_DETAIL_REVIEW:
      return { ...state, detailReview: action.payload };

    default:
      return state; // `state`を何もいじらずそのまま返す
  }
 }