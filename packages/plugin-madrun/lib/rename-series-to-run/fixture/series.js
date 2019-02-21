module.exports = {
    'lint': series(['lint:lib', 'lint:bin']),
    'test': run('some'),
};
