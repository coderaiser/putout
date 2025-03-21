import {operator} from 'putout';

const {replaceWith} = operator;

export const report = () => 'Use find instead of process';

export const replace = () => ({
    'module.exports.preProcess = __a': 'module.exports.branch = __a',
    'module.exports.postProcess = __a ': 'module.exports.merge = __a',
    'module.exports.process = __a': (vars, path) => {
        const fnPath = path.get('right');
        const {params} = fnPath.node;
        
        if (params.length > 1)
            params.pop();
        
        fnPath.traverse({
            ReturnStatement: (path) => {
                const argPath = path.get('argument');
                
                if (argPath.isArrayExpression()) {
                    const [, places] = argPath.node.elements;
                    replaceWith(argPath, places);
                }
            },
        });
        
        return 'module.exports.find = __a';
    },
});
