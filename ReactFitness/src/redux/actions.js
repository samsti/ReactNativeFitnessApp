export const UPDATE_TOTAL_CALORIES = 'UPDATE_TOTAL_CALORIES';
export const UPDATE_TOTAL_EVENTS = 'UPDATE_TOTAL_EVENTS';
export const UPDATE_MARKED_DATES = 'UPDATE_MARKED_DATES';

export const updateTotalCalories = (totalCalories) => ({
  type: UPDATE_TOTAL_CALORIES,
  payload: totalCalories,
});

export const updateTotalEvents = (totalEvents) => ({
  type: UPDATE_TOTAL_EVENTS,
  payload: totalEvents,
});

export const updateMarkedDates = (markedDates) => ({
  type: UPDATE_MARKED_DATES,
  payload: markedDates,
});