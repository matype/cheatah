var test = require('colored-tape')
var Cheatah = require('..')
var cheatah = Cheatah('test/fixture.css')

test('selectors', function (t) {
  var result = cheatah.selectors()

  var expected = ['.content-box']

  t.same(result, expected)

  t.end()
})

test('declarations', function (t) {
  var result = cheatah.declarations('.content-box')

  var expected = 'display:block;background-color:#fff;margin:10px 0;padding:20px;border-radius:5px;box-sizing:border-box;'

  t.equal(result, expected)

  t.end()
})

test('isInline', function (t) {
  var result = cheatah.isInline('.content-box')

  var expected = false

  t.equal(result, expected)

  t.end()
})
