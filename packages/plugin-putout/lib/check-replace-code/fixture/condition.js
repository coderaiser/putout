module.exports.replace = () => ({
    'if (__a = __b) __body': 'if (__a === __b) __body',
});

