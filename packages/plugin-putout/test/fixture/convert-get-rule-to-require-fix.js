const add = require('./add');
const remove = require('./remove');
const zzz = require('./zzz');
const xxx = require('./xxx');
const abcd = require('./abcd');
const getRule = (name, options = 'on') => ({
    [name]: [options, require(`./${name}`)],
});

module.exports.rules = {
    'add': add,
    'remove': remove,
    'zzz': zzz,
    'xxx': xxx,
    'abcd': abcd,
};
