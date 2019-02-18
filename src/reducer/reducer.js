import { combineReducers } from 'redux';
import { assetDetailsReducer as assetDetails } from '../redux/search-redux';
import { resultReducer as resultDetails } from '../redux/search-redux';

export const reducers = combineReducers({
  assetDetails,
  resultDetails
});


