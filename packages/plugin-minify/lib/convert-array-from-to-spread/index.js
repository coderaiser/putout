'use strict';

module.exports.report = () => `Use 'spread' instead of 'Array.from()'`;
module.exports.replace = () => ({
    'Array.from(__a)': '[...__a]',
});
