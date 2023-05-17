'use strict';

module.exports.report = () => `Use minified types`;

module.exports.replace = () => ({
    undefined: 'void 0',
    true: '!0',
    false: '!1',
});
