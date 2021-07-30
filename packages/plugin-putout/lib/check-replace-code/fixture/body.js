module.exports.replace = () => ({
    '__.forEach.call(__a, (__b) => __body)': 'for (const __b of __a) __body',
});
