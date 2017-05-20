import 'isomorphic-fetch'
var fetchMock = require('fetch-mock');
import React from 'react';
import App from './app-component';
import renderer from 'react-test-renderer';

test('App changes the class when hovered', () => {

fetch.mockResponse(JSON.stringify({deals: [{name: 'x'}] }))

  const component = renderer.create(
    <App/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});