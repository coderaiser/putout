'use strict';

module.exports.report = () => 'Template string with only one expression should not be used';

module.exports.replace = () => ({
    '`${__a}`': 'String(__a)',
});
