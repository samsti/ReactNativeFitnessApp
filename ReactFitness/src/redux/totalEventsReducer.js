
import { UPDATE_TOTAL_EVENTS } from './actions';

const initialState = 0; 

const totalEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_EVENTS:
      return action.payload; 
    default:
      return state;
  }
};

export default totalEventsReducer;
