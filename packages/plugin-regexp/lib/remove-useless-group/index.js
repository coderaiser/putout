import {operator} from 'putout';
import * as regexp from './regexp.js';

const {
    compare,
    transformRegExp,
} = operator;

export const report = ({from, to}) => `Remove useless group from RegExp ${from}, use ${to}`;

export const exclude = () => [
    '__.match(__)',
    '__.split(__)',
    '__.exec(__)',
    '__.replace(__, __)',
    '__.replaceAll(__, __)',
    'const __a = /__b/',
];

export const fix = ({path, to}) => {
    const [, pattern] = to.split('/');
    
    path.node.pattern = pattern;
    path.node.raw = to;
    path.node.extra.raw = to;
};

export const traverse = ({push}) => ({
    RegExpLiteral(path) {
        if (!includes(path))
            return;
        
        const from = path.node.extra.raw;
        const [to, places] = transformRegExp(from, regexp);
        
        if (!places.length)
            return;
        
        push({
            path,
            from,
            to,
        });
    },
});

function includes({parentPath}) {
    if (compare(parentPath.parentPath, '/__a/.test(__b)'))
        return true;
    
    return compare(parentPath, '__.search(/__a/)');
}
