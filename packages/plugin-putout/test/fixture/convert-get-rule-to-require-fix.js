const add = require('./add');
const remove = require('./remove');
const zzz = require('./zzz');
const xxx = require('./xxx');
const abcd = require('./abcd');
const getRule = (name, options) => {
    const plugin = require(`./${name}`);
    const pluginWithOptions = !options ? plugin : [options, plugin];
    
    return {
        [name]: pluginWithOptions,
    };
};

module.exports.rules = {
    'add': add,
    'remove': remove,
    'zzz': zzz,
    'xxx': xxx,
    'abcd': abcd,
};
