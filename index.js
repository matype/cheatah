var parse = require('css-parse')

module.exports = Cheater;

function Cheater (css, options) {
  if (!(this instanceof Cheater)) {
    return new Cheater(css, options);
  }

  options = options || {}

  this.css = css
  this.ast = parse(css)
}

Cheater.prototype.selectors = function () {
  var selectors = []
  var new_declaration = []

  this.ast.stylesheet.rules.forEach(function visit (rule) {
    if (rule.rules) rule.rules.forEach(visit)

    selectors.push(rule.selectors.toString())

  })
  return selectors
};

Cheater.prototype.declarations function (selector) {
  var properties = []
  var values = []
  var declaration_num = 0
  var declarations = []

  if (rule.selectors.toString() === selector) {
    rule.declarations.forEach(function (declaration) {
      if (declaration.type === 'declaration') {
        properties.push(declaration.property + ':')
        values.push(declaration.value + ';')
        declaration_num++
      }
    })
  }

  for (var i = 0; i < declaration_num; i++) {
    new_declaration.push(properties[i] + values[i]);
  }

  return declarations.join('')
}
