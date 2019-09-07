module.exports = {
    'test': () => 'type',
    'lint': () => 'x',
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => 'nyc',
};
