import {traverse} from '@putout/traverse';
import {__filesystem_name} from '@putout/operator-json';

export const getRootFromAst = (ast) => {
    let root;
    
    traverse(ast, {
        [`${__filesystem_name}(__)`](path) {
            root = path.get('arguments.0');
        },
    });
    
    return root;
};
