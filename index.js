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

Cheater.prototype.build = function () {
  this.ast.stylesheet.rules.forEach(function visit (rule) {
    if (rule.rules) rule.rules.forEach(visit)

  })
}
