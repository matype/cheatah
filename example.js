var fs = require('fs')
var Cheater = require('./')

var cheater = new Cheater('test/fixture.css');
var selectors = cheater.selectors()
console.log(selectors)
