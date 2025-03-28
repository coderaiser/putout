import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'Routes' instead of 'Switch'`;

export const fix = (path) => {
    rename(path, 'Switch', 'Routes');
};

export const traverse = ({push}) => ({
    Program(path) {
        const {Switch} = path.scope.bindings;
        
        if (!Switch)
            return;
        
        push(Switch.path);
    },
});
