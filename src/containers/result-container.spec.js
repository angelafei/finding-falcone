import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WrappedResultContainer from './result-container';

const ResultContainer = WrappedResultContainer.WrappedComponent;

describe('result container', () => {
  let props = {};

  it('render loading message', () => {
    const wrapper = shallow(<ResultContainer {...props} />);
    
    expect(wrapper.find('.result-container--loading')).to.have.lengthOf(1);
  });

  it('render success message', () => {
    const newProps = { ...props, result: { status: 'success', planet_name: 'planetA' }  };
    const wrapper = shallow(<ResultContainer {...newProps} />);
    
    expect(wrapper.find('.result-container--success__wording')).to.have.lengthOf(1);
    expect(wrapper.find('.result-container__time-taken')).to.have.lengthOf(1);
    expect(wrapper.find('.result-container__planet').text()).to.include('planetA');
  });

  it('render failure message', () => {
    const newProps = { ...props, result: { status: 'false' }  };
    const wrapper = shallow(<ResultContainer {...newProps} />);
    
    expect(wrapper.find('.result-container--failure')).to.have.lengthOf(1);
  });
});