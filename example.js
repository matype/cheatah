var fs = require('fs')
var Cheater = require('./')

var css = fs.readFileSync('test/fixture.css', 'utf-8').trim()
console.log(css)

var cheater = new Cheater(css);
var selectors = cheater.selectors()

console.log(selectors)
