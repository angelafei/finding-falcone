import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Vehicles } from './vehicles-component';

configure({ adapter: new Adapter() });

describe('vehicles component', function() {
  const sandbox = sinon.sandbox.create();
  let props;

  beforeEach(() => {
    props = {
      planet: { name: 'planetA', distance: 200 },
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
        },
        { 
          max_distance: 250,
          name: 'Space ship',
          speed: 4,
          total_no: 1
        }
      ],
      selectVehicle: sandbox.spy(),
      deselectVehicle: sandbox.spy(),
      isVehicleSelected: sandbox.spy(),
      disablePlanetsSelection: sandbox.spy()
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders input elements', () => {
    const wrapper = shallow(<Vehicles {...props} />); 
    expect(wrapper.find('input')).to.have.lengthOf(2);
  });

  it('call isVehicleSelected on componentDidMount', () => {
    shallow(<Vehicles {...props} />); 
    sinon.assert.calledOnce(props.isVehicleSelected);
  });

  describe(('vehicleSelected'), () => {
    it('should not call deselectVehicle but do other behaviours on input change', () => {
      const wrapper = shallow(<Vehicles {...props} />);
      wrapper
        .find('input')
        .first()
        .simulate('change');
  
      sinon.assert.calledWithExactly(props.disablePlanetsSelection, true);
      sinon.assert.notCalled(props.deselectVehicle);
      assert.deepEqual(wrapper.state('selectedVehicle'), props.vehicles[0]);
      sinon.assert.calledWithExactly(props.selectVehicle, props.vehicles[0]);
      sinon.assert.calledWithExactly(props.isVehicleSelected, true);
    });

    it('should call deselectVehicle as well as other behaviours on input change', () => {
      const wrapper = shallow(<Vehicles {...props} />);
      wrapper
        .find('div')
        .find('input')
        .first()
        .simulate('change')
        .simulate('change',{ target: { checked: false } });

      wrapper
        .find('div')
        .find('input')
        .last()
        .simulate('change');
  
      sinon.assert.calledWithExactly(props.disablePlanetsSelection, true);
      sinon.assert.calledWithExactly(props.deselectVehicle, props.vehicles[0]);
      assert.deepEqual(wrapper.state('selectedVehicle'), props.vehicles[2]);
      sinon.assert.calledWithExactly(props.selectVehicle, props.vehicles[2]);
      sinon.assert.calledWithExactly(props.isVehicleSelected, true);
    });
  });
});