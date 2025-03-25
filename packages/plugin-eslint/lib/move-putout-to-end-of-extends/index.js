import {operator} from 'putout';
import {getExtends} from '../get.js';

const {__json} = operator;

export const report = () => '"putout" should be in the end of the "extends" list';

export const match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        
        if (!elements.length)
            return false;
        
        const [first] = elements;
        const {value} = first;
        
        const includesPutout = value.includes('putout');
        
        if (elements.length === 1 && includesPutout)
            return false;
        
        return includesPutout;
    },
});

export const replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        
        const first = elements.shift();
        elements.push(first);
        
        return path;
    },
});
