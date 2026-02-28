import {types} from 'putout';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {isIdentifier} = types;

export const report = () => 'Remove "test.skip"';

export const replace = () => ({
    '__a.skip(__b, __c)': '__a(__b, __c)',
    '__a.skip(__b, __c, __d)': '__a(__b, __c, __d)',
});

export const filter = (path, {options}) => {
    const {allowed = []} = options;
    const all = [
        'test',
        ...maybeArray(allowed),
    ];
    
    for (const name of all) {
        const is = isIdentifier(path.node.callee.object, {
            name,
        });
        
        if (is)
            return true;
    }
    
    return false;
};
