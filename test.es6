import assert from 'assert';
import _jsdom from 'jsdom';
import mochaJsdom from 'mocha-jsdom';

import FileInput from './lib/index';


global.document = _jsdom.jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
const jsdom = mochaJsdom.bind(this, {skipWindowCheck: true});


describe('FileInput', () => {
  jsdom();
  const React = require('react/addons');

  let div;
  beforeEach(() => {
    div = document.createElement('div');
  });
  afterEach(() => {
    React.unmountComponentAtNode(div);
  });

  it('renders', () => {
    React.addons.TestUtils.renderIntoDocument(<FileInput/>, div);
  });
});
