// actions.js
export const UPDATE_TOTAL_CALORIES = 'UPDATE_TOTAL_CALORIES';
export const UPDATE_TOTAL_EVENTS = 'UPDATE_TOTAL_EVENTS';

export const updateTotalCalories = (totalCalories) => ({
  type: UPDATE_TOTAL_CALORIES,
  payload: totalCalories,
});

export const updateTotalEvents = (totalEvents) => ({
  type: UPDATE_TOTAL_EVENTS,
  payload: totalEvents,
});