import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from './slices/heroesSlice';
import filmsReducer from './slices/filmsSlice';
import shipsReducer from './slices/shipsSlice';


const rootReducer = combineReducers({
  heroes: heroesReducer,
  films:filmsReducer,
  ships:shipsReducer
});
export default rootReducer;