import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
} from '../actions/types';

export const fetchAllReviews = () => {
  return { type: FETCH_ALL_REVIEWS, payload: allReviewsTmp }; // FETCH_ALL_REVIEWSは区別しやすいならなんでもいい。
};

export const selectDetailReview = (selectDetailReview) => {
  return { type: SELECT_DETAIL_REVIEW, payload: selectedReview };
};

const GREAT = 'sentiment-very-satisfied';
const GOOD = 'sentiment-satisfied';
const POOR = 'sentiment-dissatisfied';

const allReviewsTmp = [
  {
    country: 'USA',
    dataFrom: 'Jan/15/2018',
    dateTo: 'Jan/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GREAT,
  },
  {
    country: 'USA',
    dataFrom: 'Feb/15/2018',
    dateTo: 'Feb/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GOOD,
  },
  {
    country: 'USA',
    dataFrom: 'Mar/15/2018',
    dateTo: 'Mar/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: POOR,
  },
];