import { combineReducers } from 'redux';
import totalCaloriesReducer from './totalCaloriesReducer'; 
import totalEventsReducer from './totalEventsReducer';
import markedDatesReducer from './markedDatesReducer';



const rootReducer = combineReducers({
  totalCalories: totalCaloriesReducer,
  totalEvents: totalEventsReducer,
  markedDates: markedDatesReducer,


});

export default rootReducer;
