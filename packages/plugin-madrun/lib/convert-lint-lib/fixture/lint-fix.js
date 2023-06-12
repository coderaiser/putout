module.exports = {
    'lint': () => `eslint lib test madrun.js --ignore-pattern test/fixture`,
    
    'fix:lint': () => run('lint', '--fix'),
};
