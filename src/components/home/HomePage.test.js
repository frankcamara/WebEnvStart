import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import HomePage from './HomePage';

function setup () {
  return shallow(<HomePage />) // Shallow is used when testing a single component
}

describe('Home page', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').text()).toEqual('Boilerplate for React-redux using WebEnvStart');
  });
});
