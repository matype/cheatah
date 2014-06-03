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

    var expected = [ 'display:block;', 'background-color:#eee;', 'margin:10px 0;', 'padding:20px;', 'border-radius:5px;', 'box-sizing:border-box;', 'width:200px;', 'height:200px;' ]

    t.same(result, expected)

    t.end()
})

test('isInline', function (t) {
    var result = cheatah.isInline('.content-box')

    var expected = false

    t.equal(result, expected)

    t.end()
})

test('trim', function (t) {
    var result = cheatah.trim()

    var expected = '.content-box {\n  background-color: #eee;\n  border-radius: 5px;\n  height: 200px;\n  width: 250px;\n}'

    t.equal(result, expected)

    t.end()
})

test('isDecoration', function (t) {
    var decorationProp = [
        'background',
        'background-color',
        'border',
        'border-color',
        'border-radius',
        'border-style',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'border-top-radius',
        'border-right-radius',
        'border-bottom-radius',
        'border-left-radius',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'border-width',
        'box-shqdow',
        'color',
        'filter',
        'font',
        'font-family',
        'font-feature-setting',
        'font-size',
        'font-size-adjust',
        'font-smoothing',
        'font-style',
        'font-variant',
        'font-weight',
        'letter-spacing',
        'line-height',
        'list-style',
        'opacity'
    ]

    decorationProp.forEach(function (dp) {
        var result = cheatah.isDecoration(dp)

        var expected = true

        t.equal(result, expected)
    })

    t.end()
})
