'use strict';

module.exports = {
    not: 'const not = (fn) => (...a) => !fn(...a)',
    id: 'const id = (a) => a',
    returns: 'const returns = (a) => () => a',
};
