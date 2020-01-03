'use strict';

module.exports.report = () => 'Template string with only one variable should not be used';

module.exports.replace = () => ({
    '`${__a}`': '__a',
});
