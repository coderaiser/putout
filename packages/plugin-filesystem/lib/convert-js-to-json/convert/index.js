import {operator} from 'putout';

const {__json} = operator;

export const report = () => `Convert '*.js' to '*.json'`;

export const replace = () => ({
    'export default __object': __json,
    'module.exports = __object': (vars, path) => {
        const program = path.scope.getProgramParent().path;
        
        program.node.directives = [];
        
        return __json;
    },
});
