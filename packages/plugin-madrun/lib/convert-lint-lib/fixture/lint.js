module.exports = {
 'lint:lib': () => `eslint lib test madrun.js --ignore-pattern test/fixture`,
 'lint': () => parallel(['putout', 'lint:*']),
 'fix:lint': () => run(['putout', 'lint:*'], '--fix'),
}
