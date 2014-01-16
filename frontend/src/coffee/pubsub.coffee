root = exports ? this

class Event
  constructor: (@name, @callbacks = []) ->

  addCallback: (callback) ->
    if typeof callback isnt 'function'
      throw "PubSub.on: A callback for an event (#{@name}) must be a function"

    handler = (Number(Math.random() * 10).toPrecision(5)).toString()

    @callbacks.push hd: handler, fn: callback

    return handler

  removeCallback: (handler) ->
    for item in @callbacks
      if item.hd is handler
        @callbacks.splice @callbacks.indexOf(item), 1

  getCallbacksList: ->
    return @callbacks

  fire: (data) ->
    if @callbacks.length > 0
      for cb in @callbacks
        cb.fn.call root, data

root.PubSub = class PubSub
  constructor: (@events = {}) ->

  on: (eventName, callback) ->
    if @events[eventName] is undefined
      @events[eventName] = new Event eventName

    @events[eventName].addCallback callback

  off: (eventName, callbackHandler) ->
    if @events[eventName] isnt undefined
      @events[eventName].removeCallback callbackHandler

  broadcast: (eventName, data) ->
    if @events[eventName] isnt undefined
      @events[eventName].fire data
