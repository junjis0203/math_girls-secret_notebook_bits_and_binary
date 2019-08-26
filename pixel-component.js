'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var expandLine = function expandLine(line) {
  var expanded = [];
  for (var i = 0; i < 16; i++) {
    expanded.push(line >> 15 - i & 1);
  }
  return expanded;
};

var expandLines = function expandLines(lines) {
  return lines.map(function (line) {
    return expandLine(line);
  });
};

var unexpandLine = function unexpandLine(line) {
  var unexpanded = 0;
  for (var i = 0; i < 16; i++) {
    unexpanded |= line[i] << 15 - i;
  }
  return unexpanded;
};

var unexpandLines = function unexpandLines(lines) {
  return lines.map(function (line) {
    return unexpandLine(line);
  });
};

var blankLines = function blankLines() {
  var lines = [];
  for (var i = 0; i < 16; i++) {
    lines.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  return lines;
};

var Figure = function (_React$Component) {
  _inherits(Figure, _React$Component);

  function Figure(props) {
    _classCallCheck(this, Figure);

    var _this = _possibleConstructorReturn(this, (Figure.__proto__ || Object.getPrototypeOf(Figure)).call(this, props));

    _this.state = { lines: _this.props.lines ? expandLines(_this.props.lines) : blankLines() };

    // output
    if (_this.props.store && _this.props.dst_tag) {
      _this.props.store.addSource(_this);
    }

    // input
    if (_this.props.store && _this.props.src_tag) {
      _this.props.store.addListener(_this.props.src_tag, _this);
    }
    return _this;
  }

  // output


  _createClass(Figure, [{
    key: 'dispatch',
    value: function dispatch() {
      if (this.props.store && this.props.dst_tag) {
        this.props.store.dispatch(this.props.dst_tag, unexpandLines(this.state.lines));
      }
    }

    // input

  }, {
    key: 'onDispatch',
    value: function onDispatch(lines) {
      this.setState({ lines: expandLines(lines) });
    }
  }, {
    key: 'pixels',
    value: function pixels(y, line) {
      var _this2 = this;

      var components = [];

      var _loop = function _loop(i) {
        var classNames = 'pixel';
        classNames += ' ';
        classNames += line[i] ? 'pixel-black' : 'pixel-white';
        var handler = function handler() {
          var lines = _this2.state.lines;
          lines[y][i] = lines[y][i] ? 0 : 1;
          _this2.setState({ lines: lines });
          _this2.dispatch();
        };
        var component = React.createElement('span', { key: i, className: classNames, onClick: _this2.props.clickable ? handler : null });
        components.push(component);
      };

      for (var i = 0; i < 16; i++) {
        _loop(i);
      }
      return components;
    }
  }, {
    key: 'lines',
    value: function lines() {
      var lines = this.state.lines;
      var components = [];
      for (var i = 0; i < 16; i++) {
        var component = React.createElement(
          'div',
          { key: i, className: 'pixel-line' },
          this.pixels(i, lines[i])
        );
        components.push(component);
      }
      return components;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'figure', ref: this.figure },
        this.lines()
      );
    }
  }]);

  return Figure;
}(React.Component);

var Filter = function (_React$Component2) {
  _inherits(Filter, _React$Component2);

  function Filter(props) {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'filter-wrapper' },
        React.createElement('div', { className: 'filter-before' }),
        React.createElement(
          'div',
          { className: 'filter' },
          this.props.name
        ),
        React.createElement('div', { className: 'filter-after' })
      );
    }
  }]);

  return Filter;
}(React.Component);

var Filter2 = function (_React$Component3) {
  _inherits(Filter2, _React$Component3);

  function Filter2(props) {
    _classCallCheck(this, Filter2);

    return _possibleConstructorReturn(this, (Filter2.__proto__ || Object.getPrototypeOf(Filter2)).call(this, props));
  }

  _createClass(Filter2, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'filter2-wrapper' },
        React.createElement('div', { className: 'filter2-before' }),
        React.createElement(
          'div',
          { className: 'filter2' },
          this.props.name
        ),
        React.createElement('div', { className: 'filter2-after' })
      );
    }
  }]);

  return Filter2;
}(React.Component);

var VerticalLayout = function (_React$Component4) {
  _inherits(VerticalLayout, _React$Component4);

  function VerticalLayout(props) {
    _classCallCheck(this, VerticalLayout);

    return _possibleConstructorReturn(this, (VerticalLayout.__proto__ || Object.getPrototypeOf(VerticalLayout)).call(this, props));
  }

  _createClass(VerticalLayout, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'vertical-layout' },
        React.Children.map(this.props.children, function (child) {
          return React.createElement(
            'div',
            { className: 'vertical-layout-child' },
            child
          );
        })
      );
    }
  }]);

  return VerticalLayout;
}(React.Component);