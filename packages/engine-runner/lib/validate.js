'use strict';

const isFn = (a) => typeof a === 'function';
const {stringify} = JSON;

module.exports.validate = (name, fn) => {
    if (!isFn(fn))
        throw Error(`☝️ Looks like '${name}' is not a 'function' but '${typeof fn}' with value: '${stringify(fn)}'. More on using Includer: https://git.io/JqcMn`);
};
