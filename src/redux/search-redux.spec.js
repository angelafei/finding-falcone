import Immutable from 'immutable';
import sinon from 'sinon';
import axios from 'axios';
import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  actions,
  loadPlanetDetails,
  selectPlanet,
  deselectPlanet,
  loadVehiclesDetails,
  selectVehicle,
  deselectVehicle,
  getToken,
  findResult,
  assetDetailsReducer,
  resultReducer
} from './search-redux';

describe('channelsRedux', function() {
  chai.use(deepEqualInAnyOrder);
 
  const { expect, assert } = chai;
  const sandbox = sinon.sandbox.create();
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;
  const planetsData = {
    planets: [
      { name: 'planetB', distance: 100 }, 
      { name: 'planetA', distance: 200 }
    ]
  }
  const vehiclesData = {
    vehicles: [
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
    ],
  }

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('loadPlanetDetails', function () {
    it('with success request', (done) => {
      const getStub = sandbox.stub(axios, 'get');
      getStub
        .withArgs('https://findfalcone.herokuapp.com/planets')
        .returns(Promise.resolve({
          data: planetsData
        }));

      const expected = {
        type: actions.PLANET_DETAILS_LOADED,
        payload: planetsData
      }
      store
        .dispatch(loadPlanetDetails())
        .then(response => {
          assert.deepEqual(response, expected);
        })
        .then(done, done)
    });

    // it('with failure request', (done) => {
    //   getStub.reset();
    //   getStub
    //     .withArgs('https://findfalcone.herokuapp.com/planets')
    //     .returns(Promise.reject('An error occured.'));

    //   store
    //     .dispatch(loadPlanetDetails())
    //     .then(response => {
    //       console.log('response:', response);
    //       expect(response).to.equal('A error occured.');
    //     })
    //     .then(done, done)
    // });
  });

  describe('selectPlanet', function () {
    it('should dipatch action with payload', () => {
      const planet = { name: 'planetB', distance: 100 };
      store.dispatch(selectPlanet(planet));
      
      const storeActions = store.getActions();
      const expectedPayload = { type: actions.PLANET_SELECTED, payload: planet };
      
      assert.deepEqual(storeActions, [expectedPayload]);
    });
  });

  describe('deselectPlanet', function () {
    it('should dipatch action with payload', () => {
      const planet = { name: 'planetB', distance: 100 };
      store.dispatch(deselectPlanet(planet));
      
      const storeActions = store.getActions();
      const expectedPayload = { type: actions.PLANET_DESELECTED, payload: planet };
      
      assert.deepEqual(storeActions, [expectedPayload]);
    });
  });

  describe('loadVehiclesDetails', function () {
    it('with success request', (done) => {
      const getStub = sandbox.stub(axios, 'get');
      getStub
        .withArgs('https://findfalcone.herokuapp.com/vehicles')
        .returns(Promise.resolve({
          data: vehiclesData
        }));

      const expected = {
        type: actions.VEHICLES_DETAILS_LOADED,
        payload: vehiclesData
      }
      store
        .dispatch(loadVehiclesDetails())
        .then(response => {
          console.log('response:', response);
          console.log('expected:',expected);
          assert.deepEqual(response, expected);
        })
        .then(done, done)
    });

    // it('with failure request', (done) => {
    //   getStub.reset();
    //   getStub
    //     .withArgs('https://findfalcone.herokuapp.com/planets')
    //     .returns(Promise.reject('An error occured.'));

    //   store
    //     .dispatch(loadPlanetDetails())
    //     .then(response => {
    //       console.log('response:', response);
    //       expect(response).to.equal('A error occured.');
    //     })
    //     .then(done, done)
    // });
  });

  describe('selectVehicle', function () {
    it('should dipatch action with payload', () => {
      store.dispatch(selectVehicle(vehiclesData['vehicles'][0]));
      
      const storeActions = store.getActions();
      const expectedPayload = { type: actions.VEHICLE_SELECTED, payload: vehiclesData['vehicles'][0] };
      
      assert.deepEqual(storeActions, [expectedPayload]);
    });
  });

  describe('deselectVehicle', function () {
    it('should dipatch action with payload', () => {
      store.dispatch(deselectVehicle(vehiclesData['vehicles'][0]));
      
      const storeActions = store.getActions();
      const expectedPayload = { type: actions.VEHICLE_DESELECTED, payload: vehiclesData['vehicles'][0] };
      
      assert.deepEqual(storeActions, [expectedPayload]);
    });
  });

  describe('getToken', function () {
    it('with success request', (done) => {
      const postStub = sandbox.stub(axios, 'post');
      const data = { token: 'thisistoken' };
      postStub
        .withArgs('https://findfalcone.herokuapp.com/token')
        .returns(Promise.resolve({ data }));

      const expected = {
        type: actions.TOKEN_LOADED,
        payload: 'thisistoken'
      }
      store
        .dispatch(getToken())
        .then(response => assert.deepEqual(response, expected))
        .then(done, done)
    });

    // it('with failure request', (done) => {
    //   getStub.reset();
    //   getStub
    //     .withArgs('https://findfalcone.herokuapp.com/planets')
    //     .returns(Promise.reject('An error occured.'));

    //   store
    //     .dispatch(loadPlanetDetails())
    //     .then(response => {
    //       console.log('response:', response);
    //       expect(response).to.equal('A error occured.');
    //     })
    //     .then(done, done)
    // });
  });

  describe('findResult', function () {
    it('with success request', (done) => {
      const postStub = sandbox.stub(axios, 'post');
      const data = { status: 'success', planet_name: 'planetA' };
      postStub
        .withArgs('https://findfalcone.herokuapp.com/find')
        .returns(Promise.resolve({ data }));

      const expected = {
        type: actions.RESULT_LOADED,
        payload: data
      }
      store
        .dispatch(findResult())
        .then(response => assert.deepEqual(response, expected))
        .then(done, done)
    });

    // it('with failure request', (done) => {
    //   getStub.reset();
    //   getStub
    //     .withArgs('https://findfalcone.herokuapp.com/planets')
    //     .returns(Promise.reject('An error occured.'));

    //   store
    //     .dispatch(loadPlanetDetails())
    //     .then(response => {
    //       console.log('response:', response);
    //       expect(response).to.equal('A error occured.');
    //     })
    //     .then(done, done)
    // });
  });

  describe('assetDetailsReducer', () => {
    it(actions.PLANET_DETAILS_LOADED, () => {
      const actual = assetDetailsReducer(Immutable.Map(), {
        type: actions.PLANET_DETAILS_LOADED,
        payload: planetsData.planets
      }).toJS();

      const expected = { planets: planetsData.planets };

      assert.deepEqual(actual, expected);
    });

    it(actions.PLANET_SELECTED, () => {
      const actual = assetDetailsReducer(Immutable.Map({ planets: planetsData.planets }), {
        type: actions.PLANET_SELECTED,
        payload: planetsData.planets[0]
      }).toJS();

      const expected = {
        planets: [planetsData.planets[1]],
        selectedPlanets: [planetsData.planets[0]],
      };

      assert.deepEqual(actual, expected);
    });

    describe(actions.PLANET_DESELECTED, () => {
      it('planet already in choosable planets list', () => {
        const actual = assetDetailsReducer(Immutable.Map({ planets: planetsData.planets }), {
          type: actions.PLANET_DESELECTED,
          payload: planetsData.planets[0]
        }).toJS();
  
        const expected = { planets: planetsData.planets };
  
        assert.deepEqual(actual, expected);
      });

      it('planet not in choosable planets list and only one element in selectedPlanets', () => {
        const actual = assetDetailsReducer(Immutable.Map({ planets: [planetsData.planets[1]] }), {
          type: actions.PLANET_DESELECTED,
          payload: planetsData.planets[0]
        }).toJS();
  
        const expected = { planets: planetsData.planets};
  
        expect(actual).to.deep.equalInAnyOrder(expected);
      });

      it('planet not in choosable planets list and more than one element in selectedPlanets', () => {
        const actual = assetDetailsReducer(Immutable.Map({ 
          planets: [planetsData.planets[1]],
          selectedPlanets: [
            { name: 'planetB', distance: 100 },
            { name: 'planetC', distance: 150 }, 
            { name: 'planetD', distance: 50 }
          ]
        }), {
          type: actions.PLANET_DESELECTED,
          payload: planetsData.planets[0]
        }).toJS();
  
        const expected = { 
          planets: planetsData.planets,
          selectedPlanets: [
            { name: 'planetC', distance: 150 }, 
            { name: 'planetD', distance: 50 }
          ]
        };
  
        expect(actual).to.deep.equalInAnyOrder(expected);
      });
    });

    it(actions.VEHICLES_DETAILS_LOADED, () => {
      const actual = assetDetailsReducer(Immutable.Map(), {
        type: actions.VEHICLES_DETAILS_LOADED,
        payload: vehiclesData.vehicles
      }).toJS();

      const expected = { vehicles: vehiclesData.vehicles };

      assert.deepEqual(actual, expected);
    });

    it(actions.VEHICLE_SELECTED, () => {
      const actual = assetDetailsReducer(Immutable.Map({
        planets: [planetsData.planets[1]],
        vehicles: vehiclesData.vehicles, 
        selectedPlanets: Immutable.fromJS([planetsData.planets[0]])
      }), {
        type: actions.VEHICLE_SELECTED,
        payload: vehiclesData.vehicles[0]
      }).toJS();

      const expected = {
        planets: [planetsData.planets[1]],
        selectedPlanets: [planetsData.planets[0]],
        vehicles: [
          { 
            max_distance: 200,
            name: 'Space pod',
            speed: 2,
            total_no: 1
          },
          { 
            max_distance: 100,
            name: 'Space rocket',
            speed: 5,
            total_no: 1 
          }
        ],
        selectedVehicles: [{ 
          max_distance: 200,
          name: 'Space pod',
          speed: 2,
          total_no: 1
        }],
        timeTaken: 50
      };

      assert.deepEqual(actual, expected);
    });

    it(actions.VEHICLE_DESELECTED, () => {
      const actual = assetDetailsReducer(Immutable.Map({
        vehicles: vehiclesData.vehicles, 
        selectedVehicles: [vehiclesData.vehicles[0]]
      }), {
        type: actions.VEHICLE_DESELECTED,
        payload: vehiclesData.vehicles[0]
      }).toJS();

      const expected = {
        vehicles: [
          { 
            max_distance: 200,
            name: 'Space pod',
            speed: 2,
            total_no: 3
          },
          { 
            max_distance: 100,
            name: 'Space rocket',
            speed: 5,
            total_no: 1 
          }
        ],
        selectedVehicles: []
      };

      assert.deepEqual(actual, expected);
    });

    it(actions.ASSET_DETAILS_CLEARED, () => {
      const actual = assetDetailsReducer(Immutable.Map({
        planets: [planetsData.planets[1]],
        vehicles: vehiclesData.vehicles, 
        selectedPlanets: [planetsData.planets[0]]
      }), {
        type: actions.ASSET_DETAILS_CLEARED
      }).toJS();

      const expected = {};

      assert.deepEqual(actual, expected);
    });

    it(actions.TOKEN_LOADED, () => {
      const actual = assetDetailsReducer(Immutable.Map({}), {
        type: actions.TOKEN_LOADED,
        payload: 'thisistoken'
      }).toJS();

      const expected = { token: 'thisistoken' };

      assert.deepEqual(actual, expected);
    });
  });

  describe('resultReducer', () => {
    it(actions.RESULT_LOADED, () => {
      const actual = resultReducer(Immutable.Map({}), {
        type: actions.RESULT_LOADED,
        payload: { status: 'success', planet_name: 'planetA' }
      }).toJS();

      const expected = { result: {
          status: 'success', 
          planet_name: 'planetA' 
        }
      };

      assert.deepEqual(actual, expected);
    });
  });
});
