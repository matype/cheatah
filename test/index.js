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

test('declarations', function (t) {
    var result = cheatah.trimmedDeclarations('.content-box')

    var expected = [ 'background-color:#eee;', 'border-radius:5px;', 'height:200px;', 'width:250px;' ]

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

    var expected = {
        type: 'stylesheet',
        stylesheet:
            { rules:
                [ { type: 'rule',
                    selectors: [ '.content-box' ],
                    declarations:
                        [ { type: 'declaration',
                            property: 'background-color',
                            value: '#eee' },
                            { type: 'declaration', property: 'border-radius', value: '5px' },
                            { property: 'height', type: 'declaration', value: '200px' },
                            { property: 'width', type: 'declaration', value: '250px' } ] } ] } };

    t.same(result, expected)

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
        'opacity',
        'transform',
        'transform-origin',
        'transform-style'
    ]

    decorationProp.forEach(function (dp) {
        var result = cheatah.isDecoration(dp)

        var expected = true

        t.equal(result, expected)
    })

    t.end()
})

test('isAnimation', function (t) {
    var animationProp = [
        '@keyframes',
        'animation',
        'animation-delay',
        'animation-direction',
        'animation-duration',
        'animation-fill-mode',
        'animation-iteration-count',
        'animation-name',
        'animation-play-state',
        'animation-timing-function',
        'appearance',
        'marquee-direction',
        'marquee-count',
        'marquee-speed',
        'marquee-style',
        'transition',
        'transition-delay',
        'transition-duration',
        'transition-property',
        'transition-timing-function'
    ]

    animationProp.forEach(function (ap) {
        var result = cheatah.isAnimation(ap)

        var expected = true

        t.equal(result, expected)
    })

    t.end()
})
