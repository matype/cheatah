var path = require('path')

var prefix = module.exports.nodePrefix = path.resolve(process.execPath, '..', '..', 'lib')
module.exports.globalModulePath = prefix + '/node_modules/cheatah'
