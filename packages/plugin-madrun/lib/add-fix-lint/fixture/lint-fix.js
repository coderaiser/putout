module.exports = {
    'lint': () => 'x',
    'fix:lint': () => run('lint', '--fix'),
};
