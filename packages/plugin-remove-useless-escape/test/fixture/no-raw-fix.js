module.exports = {
    'lint': () => 'putout lib test',
    'fix:lint': () => run('lint', '--fix'),
};
