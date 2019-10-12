const {
    run
} = require('putout');

module.exports = {
    'fix:lint': () => run('lint', '--fix'),
};
