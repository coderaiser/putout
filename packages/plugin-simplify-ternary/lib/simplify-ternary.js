'use strict';

module.exports.report = () => 'Unnecessary use of conditional expression for default assignment';

module.exports.replace = () => ({
    '__a ? __a : __b': '__a || __b',
});

