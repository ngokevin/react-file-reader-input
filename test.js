'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _libIndex = require('./lib/index');

var _libIndex2 = _interopRequireDefault(_libIndex);

var test = _reactAddons2['default'].addons.TestUtils;

describe('FileInput', function () {
  var div = undefined;
  beforeEach(function () {
    div = document.createElement('div');
  });
  afterEach(function () {
    _reactAddons2['default'].unmountComponentAtNode(div);
  });

  it('renders', function () {
    var fileInput = test.renderIntoDocument(_reactAddons2['default'].createElement(_libIndex2['default'], { className: 'input' }), div);

    var input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(input);
    _assert2['default'].ok(!input.props.children);
    _assert2['default'].deepEqual(input.props.style, {});
    _assert2['default'].equal(input.props.type, 'file');
  });

  it('can hide input with children', function () {
    var fileInput = test.renderIntoDocument(_reactAddons2['default'].createElement(
      _libIndex2['default'],
      { className: 'input' },
      _reactAddons2['default'].createElement(
        'p',
        null,
        'Input'
      )
    ), div);

    var input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(!input.props.children);
    _assert2['default'].ok(Object.keys(input.props.style).length);
    _assert2['default'].equal(input.props.type, 'file');

    var p = test.findRenderedDOMComponentWithTag(fileInput, 'p');
    _assert2['default'].ok('p');
  });

  it('can hide input with children', function () {
    var fileInput = test.renderIntoDocument(_reactAddons2['default'].createElement(
      _libIndex2['default'],
      { className: 'input' },
      _reactAddons2['default'].createElement(
        'p',
        null,
        'Input'
      )
    ), div);

    var input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    _assert2['default'].ok(!input.props.children);
    _assert2['default'].ok(input.props.style);
    _assert2['default'].equal(input.props.type, 'file');

    var p = test.findRenderedDOMComponentWithTag(fileInput, 'p');
    _assert2['default'].ok('p');
  });
});
