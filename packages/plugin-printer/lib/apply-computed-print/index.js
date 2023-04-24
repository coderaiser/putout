'use strict';

const {assign} = Object;

module.exports.report = () => `Use print('__path') instead of path.get(__path)`;

module.exports.replace = () => ({
    'print(path.get(__a))': ({__a}) => {
        const {
            raw,
            value,
        } = __a;
        
        assign(__a, {
            value: `__${value}`,
            raw: raw.replace(value, `__${value}`),
        });
        
        return 'print(__a)';
    },
});
