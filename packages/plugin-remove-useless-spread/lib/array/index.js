'use strict';

module.exports.report = () => `Useless spread should be avoided`;

module.exports.replace = () => ({
    'for (const __a of [...__b]) __c': 'for (const __a of __b) __c',
});
