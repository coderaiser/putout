import {types, operator} from 'putout';
import {
    getExtends,
    getPlugins,
    isExtends,
    isPlugins,
} from '../get.js';

const {__json} = operator;
const {StringLiteral} = types;

export const report = () => `Add 'putout' to 'plugins' and 'extends'`;

export const match = () => ({
    [__json]: ({__object}) => {
        if (!isExtends(__object) || !isPlugins(__object))
            return false;
        
        for (const {value} of getPlugins(__object)) {
            if (value === 'putout')
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    [__json]: ({__object}, path) => {
        getExtends(__object).push(StringLiteral('putout:plugin/safe+align'));
        getPlugins(__object).push(StringLiteral('putout'));
        
        return path;
    },
});
