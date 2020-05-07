'use strict';

module.exports.report = () => 'Avoid nested destructuring';

module.exports.replace = () => ({
    'const {__a: {__b}} = __c': 'const {__a} = __c, {__b} = __a',
});
