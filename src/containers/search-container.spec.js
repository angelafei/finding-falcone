import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WrappedSearchContainer from './search-container';
import { PlanetSelection } from '../components/planet-selection-component';

const SearchContainer = WrappedSearchContainer.WrappedComponent;

describe('search container', () => {
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
      token: 'thisistoken',
      selectPlanet: () => {},
      deselectPlanet: () => {},
      selectVehicle: () => {},
      deselectVehicle: () => {},
      findResult: sandbox.spy()
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('render planet selection component', () => {
    const wrapper = shallow(<SearchContainer {...props} />);
    
    expect(wrapper.find(PlanetSelection)).to.have.lengthOf(1);
  });

  it('set state of isPlanetSelected when calling isPlanetSelected()', () => {
    const wrapper = shallow(<SearchContainer {...props} />);
    wrapper.instance().isPlanetSelected(true);

    expect(wrapper.state('isPlanetSelected')).to.be.true; 
  });

  it('set state of isVehicleSelected when calling isVehicleSelected()', () => {
    const wrapper = shallow(<SearchContainer {...props} />);
    wrapper.instance().isVehicleSelected(true);

    expect(wrapper.state('isVehicleSelected')).to.be.true; 
  });

  describe('step button', () => {
    it('should display the correct wording', () => {
      const wrapper = shallow(<SearchContainer {...props} />);
      expect(wrapper.find('button').text()).to.equal('next');

      wrapper.setState({ selectedPlanetNumber: 3 });
      expect(wrapper.find('button').text()).to.equal('find falcone');
    });

    it('should be disabled while planet or vehicle not selected', () => {
      const wrapper = shallow(<SearchContainer {...props} />);
      expect(wrapper.find('button').prop('disabled')).to.be.true;
    });

    it('should not be disabled while planet and vehicle are selected', () => {
      const wrapper = shallow(<SearchContainer {...props} />);
      wrapper.setState({ isPlanetSelected: true, isVehicleSelected: true });

      expect(wrapper.find('button').prop('disabled')).to.be.false;
    });

    it('increase selected planet number when press `next` button', () => {
      const wrapper = shallow(<SearchContainer {...props} />);
      wrapper.find('button').simulate('click');

      expect(wrapper.state('selectedPlanetNumber')).to.equal(1);
    });

    it('call find result and switch to result page', () => {
      const newProps = {
        ...props, 
        selectedPlanets: props.planets,
        selectedVehicles: props.vehicles,
        history: { push: sandbox.spy() }
      }
      const wrapper = shallow(<SearchContainer {...newProps} />);
      wrapper.setState({ selectedPlanetNumber: 3 });
      wrapper.find('button').simulate('click');

      sinon.assert.calledWithExactly(props.findResult, props.token, ['planetB', 'planetA'], ['Space pod', 'Space rocket'] );
      sinon.assert.calledWithExactly(newProps.history.push, '/result');  
    });
  });

  it('render time taken when it got value', () => {
    const newProps = { ...props, timeTaken: 10 };
    const wrapper = shallow(<SearchContainer {...newProps} />);
    expect(wrapper.find('.search-container__time-taken').text()).to.equal('Time taken: 10');
  });
});