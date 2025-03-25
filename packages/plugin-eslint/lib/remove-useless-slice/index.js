export const report = () => `Avoid useless '.slice()' in Flat Config`;

export const replace = () => ({
    'export default __a.slice()': 'export default __a',
    'module.exports = __a.slice()': 'module.exports = __a',
});
