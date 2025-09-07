import {types, operator} from 'putout';

const {hasTagName} = operator;
const {isJSXElement} = types;

export const report = () => `Remove '<a>' from <Link>, it always renders under the hood`;

export const replace = () => ({
    '<Link href="__a">__jsx_children</Link>': ({__jsx_children}, path) => {
        for (const node of __jsx_children) {
            if (!isJSXElement(node))
                continue;
            
            if (!hasTagName(node, 'a'))
                continue;
            
            [__jsx_children[1]] = node.children;
        }
        
        return path;
    },
});
