var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.sources = [];
    this.listeners = {};

    this.pool = {};
  }

  _createClass(Store, [{
    key: 'addSource',
    value: function addSource(source) {
      this.sources.push(source);
    }
  }, {
    key: 'start',
    value: function start() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var s = _step.value;

          s.dispatch();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'addFilter',
    value: function addFilter(src_tag, filter, dst_tag) {
      var _this = this;

      // listen tag and execute filter
      var listener = {
        onDispatch: function onDispatch(input) {
          var output = filter(input);
          _this.dispatch(dst_tag, output);
        }
      };
      this.addListener(src_tag, listener);
    }
  }, {
    key: 'addFilter2',
    value: function addFilter2(src_tag1, src_tag2, filter2, dst_tag) {
      var _this2 = this;

      // almost same. but remain stupid for readable.
      var listener1 = {
        onDispatch: function onDispatch(input) {
          if (_this2.pool[src_tag2]) {
            var output = filter2(_this2.pool[src_tag2], input);
            _this2.dispatch(dst_tag, output);
          }
        }
      };
      var listener2 = {
        onDispatch: function onDispatch(input) {
          if (_this2.pool[src_tag1]) {
            var output = filter2(_this2.pool[src_tag1], input);
            _this2.dispatch(dst_tag, output);
          }
        }
      };
      this.addListener(src_tag1, listener1);
      this.addListener(src_tag2, listener2);
    }
  }, {
    key: 'addListener',
    value: function addListener(src_tag, listener) {
      if (!this.listeners[src_tag]) {
        this.listeners[src_tag] = [];
      }
      this.listeners[src_tag].push(listener);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(src_tag, input) {
      // save current input for tag
      this.pool[src_tag] = input;

      var listeners = this.listeners[src_tag];
      if (listeners) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var l = _step2.value;

            l.onDispatch(input);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return Store;
}();

var Composer = function () {
  function Composer() {
    _classCallCheck(this, Composer);

    this.store = new Store();
    this.tag_count = 0;
  }

  _createClass(Composer, [{
    key: 'makeSource',
    value: function makeSource(input) {
      var dst_tag = 'tag' + this.tag_count++;
      var component = React.createElement(Figure, { lines: input, clickable: true, store: this.store, dst_tag: dst_tag });
      return { component: component, tag: dst_tag };
    }
  }, {
    key: 'addFilter',
    value: function addFilter(in_, filter) {
      var dst_tag = 'tag' + this.tag_count++;
      this.store.addFilter(in_.tag, filter, dst_tag);

      var component = React.createElement(
        'span',
        null,
        in_.component,
        React.createElement(Filter, { name: filter.name.toUpperCase() }),
        React.createElement(Figure, { store: this.store, src_tag: dst_tag })
      );
      return { component: component, tag: dst_tag };
    }
  }, {
    key: 'addFilter2',
    value: function addFilter2(in1, in2, filter) {
      var dst_tag = 'tag' + this.tag_count++;
      this.store.addFilter2(in1.tag, in2.tag, filter, dst_tag);

      var component = React.createElement(
        'span',
        null,
        React.createElement(
          VerticalLayout,
          null,
          in1.component,
          in2.component
        ),
        React.createElement(Filter2, { name: filter.name.toUpperCase() }),
        React.createElement(Figure, { store: this.store, src_tag: dst_tag })
      );
      return { component: component, tag: dst_tag };
    }
  }]);

  return Composer;
}();