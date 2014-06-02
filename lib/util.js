var fs = require('fs')

module.exports.importTemplate = function (options) {
    if (options.template) var template = fs.readFileSync(options.template, 'utf-8').trim();
    else var template = fs.readFileSync('template/default.ejs', 'utf-8').trim();

    return template
}

module.exports.importStyle = function (options) {
    if (options.stylesheet) var style = fs.readFileSync(options.stylesheet, 'utf-8').trim();
    else var style = fs.readFileSync('template/default.css', 'utf-8').trim();

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
        'opacity'
    ]

    return decorationProp
}
