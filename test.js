'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsdom2 = require('jsdom');

var _jsdom3 = _interopRequireDefault(_jsdom2);

var _mochaJsdom = require('mocha-jsdom');

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

var _libIndex = require('./lib/index');

var _libIndex2 = _interopRequireDefault(_libIndex);

global.document = _jsdom3['default'].jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
var jsdom = _mochaJsdom2['default'].bind(undefined, { skipWindowCheck: true });

describe('FileInput', function () {
  jsdom();
  var React = require('react/addons');

  var div = undefined;
  beforeEach(function () {
    div = document.createElement('div');
  });
  afterEach(function () {
    React.unmountComponentAtNode(div);
  });

  it('renders', function () {
    React.addons.TestUtils.renderIntoDocument(React.createElement(_libIndex2['default'], null), div);
  });
});
