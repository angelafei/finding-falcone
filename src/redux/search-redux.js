import { createReducer } from '../helpers/create-reducer';
import { createAction, createActionWithPayload } from '../helpers/create-action';
import Immutable from 'immutable';
import axios from 'axios';
import get from 'lodash/get';

export const actions = {
  PLANET_DETAILS_LOADED: 'PLANET_DETAILS_LOADED',
  PLANET_SELECTED: 'PLANET_SELECTED',
  PLANET_DESELECTED: 'PLANET_DESELECTED',
  VEHICLES_DETAILS_LOADED: 'VEHICLES_DETAILS_LOADED',
  VEHICLE_SELECTED: 'VEHICLE_SELECTED',
  VEHICLE_DESELECTED: 'VEHICLE_DESELECTED',
  ASSET_DETAILS_CLEARED: 'ASSET_DETAILS_CLEARED',
  TOKEN_LOADED: 'TOKEN_LOADED',
  RESULT_LOADED: 'RESULT_LOADED'
};

export function loadPlanetDetails() {
  return (dispatch) => {
    dispatch(createAction(actions.ASSET_DETAILS_CLEARED));

    return axios
      .get('https://findfalcone.herokuapp.com/planets')
      .then(response => createActionWithPayload(actions.PLANET_DETAILS_LOADED, response.data))
      .catch((err) => console.log('error on getting planets data:', err))
      .then(dispatch);
  };
}

export function selectPlanet(planet) {
  return createAction(actions.PLANET_SELECTED, planet);
}

export function deselectPlanet(planet) {
  return createAction(actions.PLANET_DESELECTED, planet);
}

export function loadVehiclesDetails() {
  return (dispatch) => {
    return axios
      .get('https://findfalcone.herokuapp.com/vehicles')
      .then(response => createActionWithPayload(actions.VEHICLES_DETAILS_LOADED, response.data))
      .catch((err) => console.log('error on getting planets data:', err))
      .then(dispatch);
  };
}

export function selectVehicle(vehicle) {
  return createAction(actions.VEHICLE_SELECTED, vehicle);
}

export function deselectVehicle(vehicle) {
  return createAction(actions.VEHICLE_DESELECTED, vehicle);
}

export function getToken() {
  return (dispatch) => {
    const headers = { 'Accept': 'application/json' };
    const data = { data: {} };

    return axios.post('https://findfalcone.herokuapp.com/token', { data }, { headers } )
      .then(response => createActionWithPayload(actions.TOKEN_LOADED, response.data.token))
      .catch((err) => console.log('error on getting planets data:', err))
      .then(dispatch);
  }
}

export function findResult(token, planetNames, vehicleNames) {
  return (dispatch) => {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const data = {
      token,
      planet_names: planetNames,
      vehicle_names: vehicleNames
    };

    return axios.post('https://findfalcone.herokuapp.com/find', data, { headers })
      .then(response => createActionWithPayload(actions.RESULT_LOADED, response.data))
      .catch((err) => console.log('error on getting planets data:', err))
      .then(dispatch);
  }
}

export const assetDetailsReducer = createReducer(Immutable.Map(), {
  [actions.PLANET_DETAILS_LOADED]: (state, data) => state.set('planets', Immutable.fromJS(data)),
  [actions.PLANET_SELECTED]: (state, data) => {
    const planetsData = [...get(state.toJS(), ['planets'])];
    const filtered = planetsData.filter(planet => planet.name !== data.name);
    const prevSelectedPlanets = get(state.toJS(), ['selectedPlanets'], []);
    const selectedPlanets = [...prevSelectedPlanets, data];

    return state.set('planets', Immutable.fromJS(filtered)).set('selectedPlanets', Immutable.fromJS(selectedPlanets));
  },
  [actions.PLANET_DESELECTED]: (state, data) => {
    const choosablePlanets = get(state.toJS(), ['planets']);
    const isInChoosablePlanets = Boolean(choosablePlanets.find(planet => planet.name === data.name));

    if (isInChoosablePlanets){
      return state;
    }

    const planets = [...choosablePlanets, data];
    const selectedPlanets = [...get(state.toJS(), ['selectedPlanets'], [])].filter(planet => planet.name !== data.name);

    if (selectedPlanets.length > 0){
      return state.set('planets', Immutable.fromJS(planets)).set('selectedPlanets', Immutable.fromJS(selectedPlanets));
    }
    return state.set('planets', Immutable.fromJS(planets)).delete('selectedPlanets');
  },
  [actions.VEHICLES_DETAILS_LOADED]: (state, data) => state.set('vehicles', Immutable.fromJS(data)),
  [actions.VEHICLE_SELECTED]: (state, data) => {
    const vehiclesData = [...get(state.toJS(), ['vehicles'])];
    let selectedVehicle = {}; 
    vehiclesData.map(vehicle => {
      if (vehicle.name === data.name) {
        selectedVehicle = vehicle;
        vehicle.total_no --;
      }
    });

    const selectedVehicles = [...get(state.toJS(), ['selectedVehicles'], []), selectedVehicle];
    const time = state.get('selectedPlanets').toJS().reduce(
          (accumulator, currentValue, currentIndex) => 
            accumulator + currentValue.distance/selectedVehicles[currentIndex]['speed']
          , 0);

    return state.set('vehicles', Immutable.fromJS(vehiclesData))
      .set('selectedVehicles', Immutable.fromJS(selectedVehicles))
      .set('timeTaken', time);
  },
  [actions.VEHICLE_DESELECTED]: (state, data) => {
    const vehiclesData = [...get(state.toJS(), ['vehicles'])];
  
    vehiclesData.map(vehicle => {
      if (vehicle.name === data.name) {
        vehicle.total_no ++;
      }
    });

    const selectedVehicles = [...get(state.toJS(), ['selectedVehicles'], [])];
    selectedVehicles.pop();

    return state.set('vehicles', Immutable.fromJS(vehiclesData)).set('selectedVehicles', Immutable.fromJS(selectedVehicles));
  },
  [actions.ASSET_DETAILS_CLEARED]: state => state.clear(),
  [actions.TOKEN_LOADED]: (state, data) => state.set('token', Immutable.fromJS(data))
});

export const resultReducer = createReducer(Immutable.Map(), {
  [actions.RESULT_LOADED]: (state, data) => state.set('result', Immutable.fromJS(data))
});
