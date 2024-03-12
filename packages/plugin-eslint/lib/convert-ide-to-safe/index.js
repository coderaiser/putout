import {operator} from 'putout';
import {getExtends} from '../get.js';

const {__json} = operator;

export const report = () => 'Use "putout/safe" instead of "putout/ide"';

export const match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        
        for (const {value} of elements) {
            if (value.includes('putout/ide'))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('putout/ide'))
                element.value = 'plugin:putout/safe';
        }
        
        return path;
    },
});
