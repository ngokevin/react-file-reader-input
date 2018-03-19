'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileInput = function (_React$Component) {
  _inherits(FileInput, _React$Component);

  function FileInput(props) {
    _classCallCheck(this, FileInput);

    var _this = _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));
    // FileReader compatibility warning.


    _this.handleChange = function (e) {
      var files = Array.prototype.slice.call(e.target.files); // Convert into Array
      var readAs = (_this.props.as || 'url').toLowerCase();

      // Build Promise List, each promise resolved by FileReader.onload.
      Promise.all(files.map(function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.onload = function (result) {
            // Resolve both the FileReader result and its original file.
            resolve([result, file]);
          };

          // Read the file with format based on this.props.as.
          switch (readAs) {
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

    _this.triggerInput = function () {
      var input = _reactDom2.default.findDOMNode(_this._reactFileReaderInput);
      if (input) {
        input.click();
      }
    };

    var win = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : {};
    if (!win.File || !win.FileReader || !win.FileList || !win.Blob) {
      console.warn('[react-file-reader-input] Some file APIs detected as not supported.' + ' File reader functionality may not fully work.');
    }
    return _this;
  }

  _createClass(FileInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          as = _props.as,
          children = _props.children,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['as', 'children', 'style']);

      var hiddenInputStyle = children ? {
        // If user passes in children, display children and hide input.
        position: 'absolute',
        top: '-9999px'
      } : {};

      return React.createElement(
        'div',
        { className: '_react-file-reader-input', onClick: this.triggerInput, style: style },
        React.createElement('input', _extends({}, props, {
          type: 'file',
          ref: function ref(c) {
            _this2._reactFileReaderInput = c;
          },
          onChange: this.handleChange,
          onClick: function onClick() {
            _this2._reactFileReaderInput.value = null;
          },
          style: hiddenInputStyle
        })),
        children
      );
    }
  }]);

  return FileInput;
}(React.Component);

exports.default = FileInput;