// reducers.js
import { combineReducers } from 'redux';
import totalCaloriesReducer from './totalCaloriesReducer'; // Import the reducer for totalCalories
import totalEventsReducer from './totalEventsReducer';
import markedDatesReducer from './markedDatesReducer';



const rootReducer = combineReducers({
  totalCalories: totalCaloriesReducer,
  totalEvents: totalEventsReducer,
  markedDates: markedDatesReducer,

  // Other reducers can be added here if needed

});

export default rootReducer;
