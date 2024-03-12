import { UPDATE_MARKED_DATES } from './actions';

const initialState = {};

const markedDatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MARKED_DATES:
      return action.payload;
    default:
      return state;
  }
};

export default markedDatesReducer;
