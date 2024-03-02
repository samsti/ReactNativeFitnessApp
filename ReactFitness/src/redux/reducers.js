// reducers.js
import { combineReducers } from 'redux';
import totalCaloriesReducer from './totalCaloriesReducer'; // Import the reducer for totalCalories

const rootReducer = combineReducers({
  totalCalories: totalCaloriesReducer,
  // Other reducers can be added here if needed
});

export default rootReducer;
