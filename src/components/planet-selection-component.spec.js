import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Autocomplete from 'react-autocomplete';

import { PlanetSelection } from './planet-selection-component';
import { Vehicles } from './vehicles-component';

configure({ adapter: new Adapter() });

describe('planet selection component', function() {
  const sandbox = sinon.sandbox.create();
  let props;

  beforeEach(() => {
    props = {
      planets: [
        { name: 'planetB', distance: 100 }, 
        { name: 'planetA', distance: 200 }
      ],
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
      selectPlanet: sandbox.spy(),
      deselectPlanet: () => {},
      isPlanetSelected: sandbox.spy(),
      isVehicleSelected: () => {},
      selectVehicle: () => {},
      deselectVehicle: () => {}
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Autocomplete', () => {
    const wrapper = shallow(<PlanetSelection {...props} />); 
    expect(wrapper.find(Autocomplete)).to.have.lengthOf(1);
  });

  it('call isPlanetSelected on componentDidMount', () => {
    shallow(<PlanetSelection {...props} />); 
    sinon.assert.calledOnce(props.isPlanetSelected);
  });

  it('renders Vehicles when disableVehiclesSelection is false', () => {
    const wrapper = shallow(<PlanetSelection {...props} />);

    expect(wrapper.find(Vehicles)).to.have.lengthOf(0);
    wrapper.setState({ disableVehiclesSelection: false });
    expect(wrapper.find(Vehicles)).to.have.lengthOf(1);
  });

  it('filter the items for Autocomplete', () => {
    const wrapper = shallow(<PlanetSelection {...props} />);
    const items = wrapper.find(Autocomplete).prop('items');
    const sortedItems = [
      { name: 'planetA', distance: 200 },
      { name: 'planetB', distance: 100 }
    ];

    assert.deepEqual(items, sortedItems);
  });

  it('set value and disableVehiclesSelection on autocomplete input change', () => {
    const wrapper = shallow(<PlanetSelection {...props} />);
    wrapper
      .find(Autocomplete)
      .dive()
      .find('input')
      .simulate('change', { target: { value: 'planetA' } });

    expect(wrapper.state('value')).to.equal('planetA');
    expect(wrapper.state('disableVehiclesSelection')).to.be.true;
  });

  it('set value, selectedPlanet and disableVehiclesSelection as well as call isPlanetSelected and selectPlanet on autocomplete element selection', () => {
    const wrapper = shallow(<PlanetSelection {...props} />);
    sandbox.resetHistory();
    wrapper.find(Autocomplete).prop('onSelect')('planetA');

    expect(wrapper.state('value')).to.equal('planetA');
    assert.deepEqual(wrapper.state('selectedPlanet'), { name: 'planetA', distance: 200 });
    expect(wrapper.state('disableVehiclesSelection')).to.be.false;
    sinon.assert.calledOnce(props.isPlanetSelected);
    sinon.assert.calledWithExactly(props.selectPlanet, { name: 'planetA', distance: 200 });
  });
});