import {operator} from 'putout';
import * as regexp from './regexp.js';

const {transformRegExp} = operator;

export const report = ({from, to}) => `Remove duplicates from character class: '${from}' -> '${to}'`;

export const fix = ({path, to}) => {
    const [, pattern] = to.split('/');
    
    path.node.pattern = pattern;
    path.node.raw = to;
    path.node.extra.raw = to;
};

export const traverse = ({push}) => ({
    RegExpLiteral(path) {
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
