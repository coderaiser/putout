import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Remove 'node/no-unsupported-features'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-unsupported-features/es-syntax')
            push(path);
    },
});
