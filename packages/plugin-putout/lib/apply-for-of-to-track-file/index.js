'use strict';

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.replace = () => ({
    'trackFile(__a, __b).map(push)': 'for (const file of trackFile( __a, __b)) {push(file)}',
});
