module.exports.replace = () => ({
    '(__args__a) => __identifier__a(__args__a)': '__identifier__a',
    'defineConfig([__identifier])': '__identifier'
});
