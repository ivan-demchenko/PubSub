root = exports ? this

i1 = document.getElementById 'text1'
i2 = document.getElementById 'text2'
i3 = document.getElementById 'text3'

h1 = h2 = h3 = null

ps = new PubSub()

ps.on 'evt1', -> console.log 'evt1 fired!'
ps.on 'evt2', -> console.log 'evt2 fired!'
ps.on 'evt3', -> console.log 'evt3 fired!'

callback1 = (data) ->
  i1.value = data
  i3.value = data

callback2 = (data) ->
  i1.value = data;

callback3 = (data) ->
  i1.value = data
  i2.value = data
  i3.value = data

root.fireEvent = (eventName, data) ->
  ps.broadcast eventName, data

root.onEvent = (handlerID) ->
  switch handlerID
    when 'h1' then h1 = ps.on 'evt1', callback1
    when 'h2' then h2 = ps.on 'evt2', callback2
    when 'h3' then h3 = ps.on 'evt3', callback3

root.offEvent = (handlerID) ->
  switch handlerID
    when 'h1' then ps.off 'evt1', h1
    when 'h2' then ps.off 'evt2', h2
    when 'h3' then ps.off 'evt3', h3