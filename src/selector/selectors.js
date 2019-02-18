import { createSelector } from 'reselect';

const planetsSelector = state => state.assetDetails.get('planets') && state.assetDetails.get('planets').toJS();
const vehiclesSelector = state => state.assetDetails.get('vehicles') && state.assetDetails.get('vehicles').toJS();
const tokenSelector = state => state.assetDetails.get('token');
const selectedPlanets = state => state.assetDetails.get('selectedPlanets') && state.assetDetails.get('selectedPlanets').toJS();
const selectedVehicles = state => state.assetDetails.get('selectedVehicles') && state.assetDetails.get('selectedVehicles').toJS();
const timeTakenSelector = state => state.assetDetails.get('timeTaken');

export const searchSelector = createSelector(
  [planetsSelector, vehiclesSelector, tokenSelector, selectedPlanets, selectedVehicles, timeTakenSelector], 
  (planets, vehicles, token, selectedPlanets, selectedVehicles, timeTaken) => {

    return {
      planets,
      vehicles,
      token,
      selectedPlanets,
      selectedVehicles,
      timeTaken
    }
  }
)

export const resultSelector = state => {
  return {
    result: state.resultDetails.get('result') && state.resultDetails.get('result').toJS(),
    timeTaken: state.assetDetails.get('timeTaken')
  }
}
