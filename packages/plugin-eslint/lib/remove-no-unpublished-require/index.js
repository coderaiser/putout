import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Remove 'node/no-unpublished-require'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-unpublished-require')
            push(path);
    },
});
