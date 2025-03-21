export const report = () => `Use 'Declarator' instead of 'operator.declare()'`;

export const replace = () => ({
    'module.exports = declare(__a)': 'module.exports.declare = () => __a',
});
