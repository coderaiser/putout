import {operator} from 'putout';
import {getExtends, getPlugins} from '../get.js';

const {__json} = operator;
const {assign} = Object;

export const report = () => `Use 'n' instead of 'node'`;

export const match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        const plugins = getPlugins(__object);
        
        for (const {value} of elements) {
            if (value.includes('node/recommended'))
                return true;
        }
        
        for (const {value} of plugins) {
            if (value === 'node')
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        const plugins = getPlugins(__object);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('node/recommended'))
                assign(element, {
                    value: 'plugin:n/recommended',
                    raw: element.raw.replace('node', 'n'),
                });
        }
        
        for (const element of plugins) {
            const {value} = element;
            
            if (value === 'node')
                assign(element, {
                    value: 'n',
                    raw: element.raw.replace('node', 'n'),
                });
        }
        
        return path;
    },
});
