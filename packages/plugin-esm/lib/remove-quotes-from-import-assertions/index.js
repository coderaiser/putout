'use strict';

module.exports.report = () => 'Remove quotes from import assertions';

module.exports.replace = () => ({
    'import __imports from "__a" with {"type": "__b"}': 'import __imports from "__a" with {type: "__b"}',
});
