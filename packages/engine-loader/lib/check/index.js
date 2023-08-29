'use strict';

const isString = (a) => typeof a === 'string';

module.exports.check = (options) => {
    if (!options || typeof options !== 'object')
        throw Error('options should be an object!');
};

module.exports.checkRule = (rule) => {
    if (!isString(rule))
        throw Error(`☝️ Looks like plugin name type is not 'string', but: '${typeof rule}'`);
};
