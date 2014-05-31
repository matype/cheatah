var fs = require('fs')
var erb = require('erb')
var parse = require('css-parse')

module.exports = Cheater;

function Cheater (cssPath, options) {
  if (!(this instanceof Cheater)) return new Cheater(css, options);

  this.options = options || {}

  this.cssPath = cssPath
  this.css = read(cssPath)
  this.ast = parse(this.css)
  console.log(this.ast.stylesheet)

  this.template = importTemplate()
  this.style = importStyle()
}

Cheater.prototype.selectors = function () {
  var selectors = []
  var new_declaration = []

  this.ast.stylesheet.rules.forEach(function visit (rule) {
    if (rule.rules) rule.rules.forEach(visit)

    selectors.push(rule.selectors.toString())

  })

  return selectors
}

Cheater.prototype.declarations  = function (selector) {
  var properties = []
  var values = []
  var declaration_num = 0
  var declarations = []

  this.ast.stylesheet.rules.forEach(function visit (rule) {
    if (rule.rules) rule.rules.forEach(visit)

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
    new_declaration.push(properties[i] + values[i])
  }

  return declarations.join('')
}

Cheater.prototype.isInline = function (selector) {
  this.ast.stylesheet.rules.forEach(function visit (rule) {
    if (rule.rules) rule.rules.forEach(visit)

    rule.declaration.forEach(function (declaration) {
      if (declaration.property.match(/width|height/)
      || (declaration.property === 'display' && declaration.value === 'block')) {
        return false
      }
    })
  })

  return true
}

Cheater.prototype.template = function () {
  var self = this

  var tmplData = {}
  tmplData.tmplCss = self.style;
  tmplData.css = self.css;
  tmplData.selectors = self.selectors()
  tmplData.declarations = []

  tmplData.selectors.forEach(function (selector) {
    tmplData.declarations.push(self.declarations(selector))
  })

  var html = ejs.render(this.template, tmplData)

  fs.witeFileSync('doc.html', html);
}

function importTemplate () {
  if (this.options.template) var template = read(option.template)
  else var template = read('template/default.erb')

  return template
}

function importStyle () {
  if (this.options.stylesheet) var style = read(option.stylesheet)
  else var style = read('template/default.css')

  return style
}

function read (name) {
  return fs.readFileSync(name, 'utf-8').trim()
}
