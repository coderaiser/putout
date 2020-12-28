module.exports = {
    'test': () => 'type',
    'lint': () => 'x',
    'fresh:lint': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fix'),
    'coverage': () => 'nyc',
};
