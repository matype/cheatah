var fs = require('fs')
var ejs = require('ejs')
var parse = require('css-parse')
var enclose = require('html-enclose')

module.exports = Cheatah

function Cheatah (cssPath, options) {
    if (!(this instanceof Cheatah)) return new Cheatah(cssPath, options);

    this.options = options || {}

    this.cssPath = cssPath
    this.css = read(cssPath)
    this.ast = parse(this.css)

    this.template = importTemplate(this.options)
    this.style = importStyle(this.options)
}

Cheatah.prototype.selectors = function () {
    var selectors = []

    this.ast.stylesheet.rules.forEach(function visit (rule) {
        if (rule.rules) rule.rules.forEach(visit);

        selectors.push(rule.selectors.toString())
    })

    return selectors
}

Cheatah.prototype.declarations  = function (selector) {
    var properties = []
    var values = []
    var declaration_num = 0
    var declarations = []

    this.ast.stylesheet.rules.forEach(function visit (rule) {
        if (rule.rules) rule.rules.forEach(visit);

        if (rule.selectors.toString() === selector) {
            rule.declarations.forEach(function (declaration) {
                if (declaration.type === 'declaration') {
                    properties.push(declaration.property + ':')
                    values.push(declaration.value + ';')
                    declaration_num++
                }
            })
        }
    })

    for (var i = 0; i < declaration_num; i++) {
        declarations.push(properties[i] + values[i])
    }

    return declarations
}

Cheatah.prototype.isInline = function (selector) {
    var ret = true

    this.ast.stylesheet.rules.forEach(function visit (rule) {
        if (rule.rules) rule.rules.forEach(visit);

        rule.declarations.forEach(function (declaration) {
            if (declaration.property.match(/width|height/) || (declaration.property === 'display' && declaration.value === 'block')) {
                ret = false
            }
        })
    })

    return ret
}

Cheatah.prototype.build = function () {
    var self = this
    var tmplData = {}

    if (this.options.stylesheet) tmplData.tmplCssPath = this.options.stylesheet;
    else tmplData.tmplCssPath = 'template/default.css';

    tmplData.cssPath = self.cssPath
    tmplData.selectors = self.selectors()
    tmplData.styleAttr = []
    tmplData.declarations = []

    tmplData.selectors.forEach(function (selector) {
        tmplData.styleAttr.push(self.declarations(selector).join(''))

        var wrappedDec = [];
        self.declarations(selector).forEach(function (dec) {
            wrappedDec.push(enclose(dec, 'p'))
        })

        tmplData.declarations.push(wrappedDec.join(''))
    })

    var html = ejs.render(this.template, tmplData)
    fs.writeFileSync('doc.html', html);
}

function importTemplate (options) {
    if (options.template) var template = read(options.template);
    else var template = read('template/default.ejs');

    return template
}

function importStyle (options) {
    if (options.stylesheet) var style = read(options.stylesheet);
    else var style = read('template/default.css');

    return style
}

function read (name) {
    return fs.readFileSync(name, 'utf-8').trim()
}

function isDecoration (property) {
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

    var ret = false;

    decorationProp.forEach(function (dp) {
        if (property === dp) {
            ret = true
            return
        }
    })

    return ret
}
