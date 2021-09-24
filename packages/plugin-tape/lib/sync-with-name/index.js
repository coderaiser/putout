'use strict';

module.exports.report = () => `'stub().withName(name)' should synced with variable name`;

module.exports.match = () => ({
    'const __a = stub().withName(__b)': ({__a, __b}) => __b.value !== __a.name,
});

module.exports.replace = () => ({
    'const __a = stub().withName(__b)': ({__a, __b}, path) => {
        __b.value = __a.name;
        return path;
    },
});
