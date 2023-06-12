const {run} = require('madrun');

module.exports = {
    'fix:lint': () => run('lint', '--fix'),
};
