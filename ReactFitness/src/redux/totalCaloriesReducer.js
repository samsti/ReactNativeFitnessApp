import { UPDATE_TOTAL_CALORIES } from './actions';

const initialState = 0; 

const totalCaloriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_CALORIES:
      return action.payload; 
    default:
      return state;
  }
};

export default totalCaloriesReducer;
