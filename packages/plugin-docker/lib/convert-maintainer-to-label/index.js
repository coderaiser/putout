import {operator} from 'putout';

const {
    setLiteralValue,
    __docker,
} = operator;

export const report = () => `User 'LABEL' instead of 'MAINTAINER'`;

export const fix = ({path, arg}) => {
    setLiteralValue(path, 'LABEL');
    
    const {value} = arg.node;
    
    setLiteralValue(arg, `org.opencontainers.image.authors=${value}`);
};

export const traverse = ({push}) => ({
    [__docker]: (path) => {
        const instructions = path.get('arguments.0');
        
        for (const instr of instructions.get('elements')) {
            const [name, arg] = instr.get('elements');
            const {value} = name.node;
            
            if (value === 'MAINTAINER')
                push({
                    path: name,
                    arg,
                });
        }
    },
});
