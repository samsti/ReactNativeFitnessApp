// actions.js
export const UPDATE_TOTAL_CALORIES = 'UPDATE_TOTAL_CALORIES';


export const updateTotalCalories = (totalCalories) => ({
  type: UPDATE_TOTAL_CALORIES,
  payload: totalCalories,
});

