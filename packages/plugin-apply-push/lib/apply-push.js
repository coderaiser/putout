import {template, operator} from 'putout';

const {insertAfter, getBinding} = operator;
const createPush = template('const push = NAME.push.bind(NAME)');

export const report = () => `Use binded 'push'`;

export const replace = () => ({
    '(__a) => __b.push(__a)': ({__b}, path) => {
        const {name} = __b;
        const binding = getBinding(path, name);
        
        insertAfter(binding.path.parentPath, createPush({
            NAME: name,
        }));
        
        return 'push';
    },
});
