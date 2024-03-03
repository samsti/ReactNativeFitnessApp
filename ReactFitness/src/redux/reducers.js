// reducers.js
import { combineReducers } from 'redux';
import totalCaloriesReducer from './totalCaloriesReducer'; // Import the reducer for totalCalories
import totalEventsReducer from './totalEventsReducer';


const rootReducer = combineReducers({
  totalCalories: totalCaloriesReducer,
  totalEvents: totalEventsReducer,
  // Other reducers can be added here if needed

});

export default rootReducer;
