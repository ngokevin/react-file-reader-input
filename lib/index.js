'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var FileInput = (function (_React$Component) {
  _inherits(FileInput, _React$Component);

  _createClass(FileInput, null, [{
    key: 'propTypes',
    value: {
      as: _propTypes2['default'].oneOf(['binary', 'buffer', 'text', 'url']),
      children: _propTypes2['default'].any,
      onChange: _propTypes2['default'].func
    },
    enumerable: true
  }]);

  function FileInput(props) {
    var _this = this;

    _classCallCheck(this, FileInput);

    // FileReader compatibility warning.
    _get(Object.getPrototypeOf(FileInput.prototype), 'constructor', this).call(this, props);

    this.handleChange = function (e) {
      var files = [];
      for (var i = 0; i < e.target.files.length; i++) {
        // Convert to Array.
        files.push(e.target.files[i]);
      }

      // Build Promise List, each promise resolved by FileReader.onload.
      Promise.all(files.map(function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.onload = function (result) {
            // Resolve both the FileReader result and its original file.
            resolve([result, file]);
          };

          // Read the file with format based on this.props.as.
          switch ((_this.props.as || 'url').toLowerCase()) {
            case 'binary':
              {
                reader.readAsBinaryString(file);
                break;
              }
            case 'buffer':
              {
                reader.readAsArrayBuffer(file);
                break;
              }
            case 'text':
              {
                reader.readAsText(file);
                break;
              }
            case 'url':
              {
                reader.readAsDataURL(file);
                break;
              }
          }
        });
      })).then(function (zippedResults) {
        // Run the callback after all files have been read.
        _this.props.onChange(e, zippedResults);
      });
    };

    this.triggerInput = function (e) {
      _reactDom2['default'].findDOMNode(_this._reactFileReaderInput).click();
    };

    var win = typeof window === 'object' ? window : {};
    if (typeof window === 'object' && (!win.File || !win.FileReader || !win.FileList || !win.Blob)) {
      console.warn('[react-file-reader-input] Some file APIs detected as not supported.' + ' File reader functionality may not fully work.');
    }
  }

  _createClass(FileInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hiddenInputStyle = this.props.children ? {
        // If user passes in children, display children and hide input.
        position: 'absolute',
        top: '-9999px'
      } : {};

      var _props = this.props;
      var as = _props.as;
      var style = _props.style;

      var props = _objectWithoutProperties(_props, ['as', 'style']);

      return _react2['default'].createElement(
        'div',
        { className: '_react-file-reader-input', onClick: this.triggerInput, style: style },
        _react2['default'].createElement('input', _extends({}, props, { children: undefined, type: 'file',
          onChange: this.handleChange, ref: function (c) {
            return _this2._reactFileReaderInput = c;
          },
          onClick: function () {
            _this2._reactFileReaderInput.value = null;
          },
          style: hiddenInputStyle })),
        this.props.children
      );
    }
  }]);

  return FileInput;
})(_react2['default'].Component);

exports['default'] = FileInput;
module.exports = exports['default'];