import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WrappedSplashContainer from './splash-container';

const SplashContainer = WrappedSplashContainer.WrappedComponent;

describe('splash container', () => {
  const sandbox = sinon.sandbox.create();
  let props;

  beforeEach(() => {
    props = {
      loadPlanetDetails: sandbox.spy(),
      loadVehiclesDetails: sandbox.spy(),
      getToken: sandbox.spy()
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('render splash container', () => {
    const wrapper = shallow(<SplashContainer {...props} />);
    
    expect(wrapper.find('.splash-container')).to.have.lengthOf(1);
  });

  it('call loadPlanetDetails, loadVehiclesDetails and getToken when componentDidMount triggered', () => {
    const wrapper = shallow(<SplashContainer {...props} />);
    
    sinon.assert.calledOnce(props.loadPlanetDetails);
    sinon.assert.calledOnce(props.loadVehiclesDetails);
    sinon.assert.calledOnce(props.getToken);
  });
});