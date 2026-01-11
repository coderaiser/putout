import {dirname} from 'node:path';
import {createRequire} from 'node:module';
import putout from 'putout';

const require = createRequire(import.meta.url);

export const category = 'evaluate';
export const report = () => 'Evaluate expression';
export const include = () => [
    'ImportDeclaration',
];

export const filter = ({node}) => {
    const {value} = node.source;
    return value.startsWith('__putout_evaluate:');
};

export const fix = ({text, node, filename}) => {
    const {value} = node.source;
    
    const result = evaluate({
        value,
        filename,
    });
    
    return text.replace(value, result);
};

function evaluate({value, filename}) {
    value = value.replace(/__putout_evaluate:\s?/, 'return ');
    
    const {code} = putout(value, {
        fix: true,
        rules: {
            'nodejs/convert-top-level-return': 'off',
            'nodejs/convert-commonjs-to-esm': 'off',
            'nodejs/convert-esm-to-commonjs': 'on',
        },
        plugins: [
            'nodejs',
            'declare',
        ],
    });
    
    const fn = Function('__filename', '__dirname', 'require', code);
    
    return fn(filename, dirname(filename), require);
}
