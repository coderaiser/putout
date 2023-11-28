const add = require('./add');
const remove = require('./remove');
const zzz = require('./zzz');
const xxx = require('./xxx');
const abcd = require('./abcd');

module.exports.rules = {
    'add': add,
    'remove': remove,
    'zzz': zzz,
    'xxx': xxx,
    'abcd': ['off', abcd],
};
