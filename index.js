var fs = require('fs')
var ejs = require('ejs')
var parse = require('css-parse')
var enclose = require('html-enclose')
var util = require('./lib/util')

module.exports = Cheatah

function Cheatah (cssPath, options) {
    if (!(this instanceof Cheatah)) return new Cheatah(cssPath, options);

    this.options = options || {}

    this.cssPath = cssPath
    this.css = util.read(cssPath)
    this.ast = parse(this.css)

    this.template = util.importTemplate(this.options)
    this.style = util.importStyle(this.options)
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
            if (declaration.property.match(/width|height/)
            || (declaration.property === 'display' && declaration.value === 'block')) {
                ret = false
            }
        })
    })

    return ret
}

Cheatah.prototype.isDecoration = function (property) {
    var decorationProp = util.decorationProp()
    var ret = false;

    decorationProp.forEach(function (dp) {
        if (property === dp) {
            ret = true
            return
        }
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

        var enclosedDec = [];
        self.declarations(selector).forEach(function (dec) {
            enclosedDec.push(enclose(dec, 'p'))
        })

        tmplData.declarations.push(enclosedDec.join(''))
    })

    var html = ejs.render(this.template, tmplData)
    fs.writeFileSync('doc.html', html);
}
