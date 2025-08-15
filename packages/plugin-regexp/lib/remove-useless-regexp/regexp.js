import {isAlternative, isChar} from '../types.js';

const not = (f) => (...a) => !f(...a);

export const report = () => `Remove useless RegExp, use strict equal operator instead`;
export const fix = () => {};
export const traverse = ({push}) => ({
    RegExp(path) {
        const {node} = path;
        const {body} = node;
        
        if (isChar(body) && !body.value.includes('\\')) {
            push(path);
            return;
        }
        
        if (isAlternative(body)) {
            if (!body.expressions.filter(not(isChar)).length)
                push(path);
            
            return;
        }
    },
});
