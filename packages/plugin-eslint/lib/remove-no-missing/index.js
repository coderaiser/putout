import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Remove 'node/no-missing-(require,import)'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-missing-require') {
            push(path);
            return;
        }
        
        if (path.node.key.value === 'node/no-missing-import')
            push(path);
    },
});
