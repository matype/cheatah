var fs = require('fs')
var nodePrefix = config.prefix()
var globalModulePath = config.global('cheatah')

module.exports.importTemplate = function (options) {
    if (options.template) var template = fs.readFileSync(options.template, 'utf-8').trim();
    else var template = fs.readFileSync(globalModulePath + '/template/default.ejs', 'utf-8').trim();

    return template
}

module.exports.importStyle = function (options) {
    if (options.style) var style = fs.readFileSync(options.style, 'utf-8').trim();
    else var style = fs.readFileSync(globalModulePath + '/template/default.css', 'utf-8').trim();

    return style
}

module.exports.read = function (name) {
    return fs.readFileSync(name, 'utf-8').trim()
}

module.exports.decorationProp = function () {
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

    return decorationProp
}

module.exports.animationProp = function () {
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

    return animationProp
}
