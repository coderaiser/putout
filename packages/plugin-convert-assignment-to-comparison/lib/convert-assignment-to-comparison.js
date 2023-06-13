'use strict';

module.exports.report = () => 'Expected comparison instead of assignment';

module.exports.replace = () => ({
    'if (__a = __b) __body': 'if (__a === __b) __body',
});
