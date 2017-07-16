'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomTestUtils = require('react-dom/test-utils');

var _reactDomTestUtils2 = _interopRequireDefault(_reactDomTestUtils);

var _libIndex = require('./lib/index');

var _libIndex2 = _interopRequireDefault(_libIndex);

describe('FileInput', function () {
  var div = undefined;
  beforeEach(function () {
    div = document.createElement('div');
  });
  afterEach(function () {
    _react2['default'].unmountComponentAtNode(div);
  });

  it('renders', function () {
    var fileInput = _reactDomTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(_libIndex2['default'], { className: 'input' }), div);

    var input = _reactDomTestUtils2['default'].findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(input);
    _assert2['default'].notOk(input.children.length);
    _assert2['default'].equal(input.getAttribute('type'), 'file');
  });

  it('can hide input with children', function () {
    var fileInput = _reactDomTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _libIndex2['default'],
      { className: 'input' },
      _react2['default'].createElement(
        'p',
        null,
        'Input'
      )
    ), div);

    var input = _reactDomTestUtils2['default'].findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(!input.props.children);
    _assert2['default'].ok(Object.keys(input.props.style).length);
    _assert2['default'].equal(input.props.type, 'file');

    var p = _reactDomTestUtils2['default'].findRenderedDOMComponentWithTag(fileInput, 'p');
    _assert2['default'].ok('p');
  });

  it('can hide input with children', function () {
    var fileInput = _reactDomTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _libIndex2['default'],
      { className: 'input' },
      _react2['default'].createElement(
        'p',
        null,
        'Input'
      )
    ), div);

    var input = _reactDomTestUtils2['default'].findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(!input.props.children);
    _assert2['default'].ok(input.props.style);
    _assert2['default'].equal(input.props.type, 'file');

    var p = _reactDomTestUtils2['default'].findRenderedDOMComponentWithTag(fileInput, 'p');
    _assert2['default'].ok('p');
  });
});
