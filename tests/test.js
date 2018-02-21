'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FileInput', function () {
  var div = void 0;

  beforeEach(function () {
    div = document.createElement('div');
  });

  afterEach(function () {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  });

  it('renders', function () {
    _assert2.default.ok(!div.querySelector('input'));
    _reactDom2.default.render(_react2.default.createElement(_index2.default, { className: 'input' }), div);
    var input = div.querySelector('input');
    _assert2.default.ok(div.querySelector('input'));
    _assert2.default.equal(input.children.length, 0);
    _assert2.default.equal(input.getAttribute('type'), 'file');
  });

  it('can hide input with children', function () {
    var fileInput = _reactDom2.default.render(_react2.default.createElement(
      _index2.default,
      { className: 'input' },
      _react2.default.createElement(
        'p',
        null,
        'Input'
      )
    ), div);

    var input = div.querySelector('input');
    _assert2.default.equal(input.children.length, 0);
    _assert2.default.equal(input.getAttribute('type'), 'file');

    _assert2.default.ok(div.querySelector('p'));
  });
});
