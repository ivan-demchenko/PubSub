(function() {
  describe('Pub/Sub', function() {
    var pubSubObj;
    pubSubObj = null;
    beforeEach(function() {
      return pubSubObj = new PubSub();
    });
    it('shoud be exported', function() {
      return expect(pubSubObj).not.toBeUndefined();
    });
    it('should subscribe to event and return proper handler', function() {
      var handler1, handler2;
      handler1 = pubSubObj.on('test:event', function(data) {});
      handler2 = pubSubObj.on('test:event', function(data) {});
      expect(handler1).not.toBe(0);
      return expect(handler2).not.toBe(0);
    });
    return it('should fire events properly', function() {
      spyOn(console, 'log');
      pubSubObj.on('test:event', function(data) {
        return console.log(data);
      });
      pubSubObj.broadcast('test:event', {
        msg: 'test'
      });
      return expect(console.log).toHaveBeenCalledWith({
        msg: 'test'
      });
    });
  });

}).call(this);
