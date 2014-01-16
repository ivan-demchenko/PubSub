describe 'Pub/Sub', ->

  pubSubObj = null

  beforeEach ->
    pubSubObj = new PubSub()

  it 'shoud be exported', ->
    expect(pubSubObj).not.toBeUndefined()

  it 'should subscribe to event and return proper handler', ->
    handler1 = pubSubObj.on 'test:event', (data) ->
    handler2 = pubSubObj.on 'test:event', (data) ->

    expect(handler1).not.toBe(0)
    expect(handler2).not.toBe(0)

  it 'should fire events properly', ->
    spyOn console, 'log'

    pubSubObj.on 'test:event', (data) -> console.log data

    pubSubObj.broadcast 'test:event', msg: 'test'

    expect(console.log).toHaveBeenCalledWith msg: 'test'