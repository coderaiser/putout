import {operator} from 'putout';

const {contains} = operator;

export const report = () => `Avoid useless 'async'`;

export const fix = (path) => {
    path.node.async = false;
};

export const exclude = () => [
    '__nop',
    'async (__args): Promise<__b> => __body',
];

export const include = () => [
    'async function __(__args) {}',
    'async (__args) => __body',
];

export const filter = (path) => {
    if (hasAwaitUsing(path))
        return false;
    
    return !contains(path, ['throw __', 'await __', 'for await (__ of __) __']);
};

function hasAwaitUsing(path) {
    let is = false;
    
    path.traverse({
        VariableDeclaration(path) {
            if (path.node.kind !== 'await using')
                return;
            
            is = true;
            path.stop();
        },
    });
    
    return is;
}
