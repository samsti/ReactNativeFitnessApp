import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import thunk middleware
import rootReducer from './reducers'; // Correct the path to your rootReducer file

const store = createStore(rootReducer); // Apply thunk middleware

export default store;
