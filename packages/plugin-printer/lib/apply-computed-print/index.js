import {operator} from 'putout';

const {getBinding} = operator;
const {assign} = Object;

export const report = () => `Use print('__path') instead of path.get(__path)`;

// 'print' of '@putout/printer' visitor is a param: '(path, {print}) => {}'
// 'print' of 'putout' is imported and needs a path
const isPrintParam = (path) => getBinding(path, 'print')?.kind === 'param';

export const match = () => ({
    'print(path.get(__a))': (vars, path) => isPrintParam(path),
});

export const replace = () => ({
    'print(path.get(__a))': ({__a}) => {
        const {raw, value} = __a;
        
        assign(__a, {
            value: `__${value}`,
            raw: raw.replace(value, `__${value}`),
        });
        
        return 'print(__a)';
    },
});
