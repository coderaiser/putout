'use strict';

module.exports.report = () => 'IO.createDirectory should be used instead of IO.write';

module.exports.match = () => ({
    'IO.write("__a")': ({__a}) => {
        return /\?dir$/.test(__a.value);
    },
    'IO.write(`__a`)': ({__a}) => {
        return /\?dir$/.test(__a.value.raw);
    },
});

module.exports.replace = () => ({
    'IO.write(`${__a}?dir`)': 'IO.createDirectory(__a)',
    'IO.write("__a")': ({__a}) => {
        const value = __a.value.replace(/\?dir$/, '');
        return `IO.createDirectory('${value}')`;
    },
    'IO.write(`__a`)': ({__a}) => {
        const value = __a.value.raw.replace(/\?dir$/, '');
        return `IO.createDirectory('${value}')`;
    },
});

