import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from './slices/heroesSlice';
import filmsReducer from './slices/filmsSlice';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  films:filmsReducer
});
export default rootReducer;