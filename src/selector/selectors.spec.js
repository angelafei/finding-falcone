import Immutable from 'immutable';
import { assert } from 'chai';

import { searchSelector, resultSelector } from './selectors';

describe('searchSelector', () => {
  const planets = [
    { name: 'planetB', distance: 100 }, 
    { name: 'planetA', distance: 200 }
  ];
  const vehicles = [
    { 
      max_distance: 200,
      name: 'Space pod',
      speed: 2,
      total_no: 2 
    },
    { 
      max_distance: 100,
      name: 'Space rocket',
      speed: 5,
      total_no: 1 
    }
  ];
  const selectedPlanets = [ { name: 'planetC', distance: 150 } ];
  const selectedVehicles =[ { 
    max_distance: 300,
    name: 'Space ship',
    speed: 10,
    total_no: 1 
  } ];

  const data = Immutable.Map({
    planets: Immutable.fromJS(planets),
    vehicles: Immutable.fromJS(vehicles),
    token: 'thisistoken',
    selectedPlanets: Immutable.fromJS(selectedPlanets),
    selectedVehicles: Immutable.fromJS(selectedVehicles),
    timeTaken: 10
  });

  const state = { assetDetails: data };
  
  it('returns the correct values', () => {
    assert.deepEqual(searchSelector(state), {
      planets,
      vehicles,
      token: 'thisistoken',
      selectedPlanets,
      selectedVehicles,
      timeTaken: 10
    })
  })
});

describe('resultSelector', () => {
  const state = {
    resultDetails: Immutable.Map({
      result: Immutable.fromJS({
        status: 'success',
        planet_name: 'planetA'
      })
    }),
    assetDetails: Immutable.Map({
      timeTaken: 10
    })
  }

  assert.deepEqual(resultSelector(state), {
    result: {
      status: 'success',
      planet_name: 'planetA'
    },
    timeTaken: 10
  })
});