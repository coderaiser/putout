'use strict';

module.exports.report = () => '"includes" should be used instead of "indexOf"';

module.exports.replace = () => ({
    '~__a.indexOf(__b)': '__a.includes(__b)',
    '__a.indexOf(__b) === -1': '!__a.includes(__b)',
    '__a.indexOf(__b) !== -1': '__a.includes(__b)',
});

