'use strict';

module.exports.report = () => '"supertape" should be used';

module.exports.replace = () => ({
    'const tryTo = __': '',
    'const tryToTape = __': '',
    'tryTo(__a)': '__a',
    'tryToTape(__a)': '__a',
    'require("tape")': 'require("supertape")',
});
