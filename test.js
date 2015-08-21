'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsdom2 = require('jsdom');

var _jsdom3 = _interopRequireDefault(_jsdom2);

var _mochaJsdom = require('mocha-jsdom');

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

var _reactRouter = require('react-router');

var _libIndex = require('./lib/index');

global.document = _jsdom3['default'].jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
var jsdom = _mochaJsdom2['default'].bind(undefined, { skipWindowCheck: true });

describe('ReverseLink', function () {
  jsdom();
  var React = require('react/addons');
  var history = require('react-router/lib/MemoryHistory');

  var TestComponent = (function (_React$Component) {
    _inherits(TestComponent, _React$Component);

    function TestComponent() {
      _classCallCheck(this, TestComponent);

      _get(Object.getPrototypeOf(TestComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TestComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'nav',
          null,
          React.createElement(
            _libIndex.ReverseLink,
            { to: 'landing' },
            'Home'
          ),
          React.createElement(
            _libIndex.ReverseLink,
            { to: 'detail', params: { id: 5 } },
            'Detail'
          ),
          React.createElement(
            _libIndex.ReverseLink,
            { to: 'detail-edit', params: { id: 10, user: 'kev' } },
            'Edit Post'
          )
        );
      }
    }]);

    return TestComponent;
  })(React.Component);

  var router = React.createElement(
    _reactRouter.Router,
    { history: new history('/') },
    React.createElement(
      _reactRouter.Route,
      { name: 'app', component: TestComponent },
      React.createElement(_reactRouter.Route, { name: 'landing', path: '/', component: TestComponent }),
      React.createElement(
        _reactRouter.Route,
        { name: 'detail', path: '/detail/:id', component: TestComponent },
        React.createElement(_reactRouter.Route, { name: 'detail-edit', path: '/:user/edit',
          component: TestComponent })
      )
    )
  );

  var div = undefined;
  beforeEach(function () {
    div = document.createElement('div');
  });
  afterEach(function () {
    React.unmountComponentAtNode(div);
  });

  it('reverses', function (done) {
    React.render(router, div, function () {
      var homeLink = div.querySelectorAll('a')[0];
      _assert2['default'].equal(homeLink.getAttribute('href'), '/');
      _assert2['default'].equal(homeLink.innerHTML, 'Home');

      var detailLink = div.querySelectorAll('a')[1];
      _assert2['default'].equal(detailLink.getAttribute('href'), '/detail/5');
      _assert2['default'].equal(detailLink.innerHTML, 'Detail');

      var editLink = div.querySelectorAll('a')[2];
      _assert2['default'].equal(editLink.getAttribute('href'), '/detail/10/kev/edit');
      _assert2['default'].equal(editLink.innerHTML, 'Edit Post');
      done();
    });
  });
});

describe('ReverseLink nested context', function () {
  jsdom();
  var React = require('react/addons');
  var history = require('react-router/lib/MemoryHistory');

  var App = (function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
      _classCallCheck(this, App);

      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          this.props.children
        );
      }
    }]);

    return App;
  })(React.Component);

  var Header = (function (_React$Component3) {
    _inherits(Header, _React$Component3);

    function Header() {
      _classCallCheck(this, Header);

      _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Header, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'header',
          null,
          React.createElement(
            'nav',
            null,
            React.createElement(
              'li',
              null,
              React.createElement(
                _libIndex.ReverseLink,
                { to: 'landing' },
                'Home'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                _libIndex.ReverseLink,
                { to: 'detail' },
                'Detail'
              )
            )
          )
        );
      }
    }]);

    return Header;
  })(React.Component);

  var TestComponent = (function (_React$Component4) {
    _inherits(TestComponent, _React$Component4);

    function TestComponent() {
      _classCallCheck(this, TestComponent);

      _get(Object.getPrototypeOf(TestComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TestComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(Header, null)
        );
      }
    }]);

    return TestComponent;
  })(React.Component);

  var router = React.createElement(
    _reactRouter.Router,
    { history: new history('/') },
    React.createElement(
      _reactRouter.Route,
      { name: 'app', component: App },
      React.createElement(_reactRouter.Route, { name: 'landing', path: '/', component: TestComponent }),
      React.createElement(_reactRouter.Route, { name: 'detail', path: '/detail', component: TestComponent })
    )
  );

  var div = undefined;
  beforeEach(function () {
    div = document.createElement('div');
  });
  afterEach(function () {
    React.unmountComponentAtNode(div);
  });

  it('reverses', function (done) {
    React.render(router, div, function () {
      var homeLink = div.querySelectorAll('a')[0];
      _assert2['default'].equal(homeLink.getAttribute('href'), '/');
      _assert2['default'].equal(homeLink.innerHTML, 'Home');
      done();
    });
  });
});
