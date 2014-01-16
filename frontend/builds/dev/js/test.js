(function() {
  var callback1, callback2, callback3, h1, h2, h3, i1, i2, i3, ps, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  i1 = document.getElementById('text1');

  i2 = document.getElementById('text2');

  i3 = document.getElementById('text3');

  h1 = h2 = h3 = null;

  ps = new PubSub();

  ps.on('evt1', function() {
    return console.log('evt1 fired!');
  });

  ps.on('evt2', function() {
    return console.log('evt2 fired!');
  });

  ps.on('evt3', function() {
    return console.log('evt3 fired!');
  });

  callback1 = function(data) {
    i1.value = data;
    return i3.value = data;
  };

  callback2 = function(data) {
    return i1.value = data;
  };

  callback3 = function(data) {
    i1.value = data;
    i2.value = data;
    return i3.value = data;
  };

  root.fireEvent = function(eventName, data) {
    return ps.broadcast(eventName, data);
  };

  root.onEvent = function(handlerID) {
    switch (handlerID) {
      case 'h1':
        return h1 = ps.on('evt1', callback1);
      case 'h2':
        return h2 = ps.on('evt2', callback2);
      case 'h3':
        return h3 = ps.on('evt3', callback3);
    }
  };

  root.offEvent = function(handlerID) {
    switch (handlerID) {
      case 'h1':
        return ps.off('evt1', h1);
      case 'h2':
        return ps.off('evt2', h2);
      case 'h3':
        return ps.off('evt3', h3);
    }
  };

}).call(this);
