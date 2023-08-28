import {operator} from 'putout';

const {compare, remove} = operator;

export const report = () => `Avoid using 'undefined' in variable declaration`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    VariableDeclarator(path) {
        const init = path.get('init');
        
        if (compare(init, 'void 0'))
            return push(init);
        
        if (init.isIdentifier({name: 'undefined'}))
            return push(init);
    },
});
