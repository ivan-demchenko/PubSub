(function() {
  var Event, PubSub, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Event = (function() {
    function Event(name, callbacks) {
      this.name = name;
      this.callbacks = callbacks != null ? callbacks : [];
    }

    Event.prototype.addCallback = function(callback) {
      var handler;
      if (typeof callback !== 'function') {
        throw "PubSub.on: A callback for an event (" + this.name + ") must be a function";
      }
      handler = (Number(Math.random() * 10).toPrecision(5)).toString();
      this.callbacks.push({
        hd: handler,
        fn: callback
      });
      return handler;
    };

    Event.prototype.removeCallback = function(handler) {
      var item, _i, _len, _ref, _results;
      _ref = this.callbacks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.hd === handler) {
          _results.push(this.callbacks.splice(this.callbacks.indexOf(item), 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Event.prototype.getCallbacksList = function() {
      return this.callbacks;
    };

    Event.prototype.fire = function(data) {
      var cb, _i, _len, _ref, _results;
      if (this.callbacks.length > 0) {
        _ref = this.callbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb.fn.call(root, data));
        }
        return _results;
      }
    };

    return Event;

  })();

  root.PubSub = PubSub = (function() {
    function PubSub(events) {
      this.events = events != null ? events : {};
    }

    PubSub.prototype.on = function(eventName, callback) {
      if (this.events[eventName] === void 0) {
        this.events[eventName] = new Event(eventName);
      }
      return this.events[eventName].addCallback(callback);
    };

    PubSub.prototype.off = function(eventName, callbackHandler) {
      if (this.events[eventName] !== void 0) {
        return this.events[eventName].removeCallback(callbackHandler);
      }
    };

    PubSub.prototype.broadcast = function(eventName, data) {
      if (this.events[eventName] !== void 0) {
        return this.events[eventName].fire(data);
      }
    };

    return PubSub;

  })();

}).call(this);
