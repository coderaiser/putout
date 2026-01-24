import {operator, types} from 'putout';

const {isIdentifier} = types;
const {remove} = operator;

export const report = (path) => {
    const {name} = path.node;
    return `Avoid duplicate parameter '${name}'`;
};

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    Function(path) {
        const paramsPaths = path.get('params').filter(isIdentifier);
        
        const params = new Set();
        
        for (const param of paramsPaths) {
            const {name} = param.node;
            
            if (params.has(name)) {
                push(param);
                continue;
            }
            
            params.add(name);
        }
    },
});
