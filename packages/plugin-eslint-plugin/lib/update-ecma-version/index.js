import {types, operator} from 'putout';

const {numericLiteral} = types;
const {replaceWith} = operator;

export const report = ({ecmaVersion}) => `Set 'ecmaVersion' to: ${ecmaVersion}`;

export const fix = ({path, ecmaVersion}) => {
    const node = numericLiteral(ecmaVersion);
    replaceWith(path, node);
};

export const traverse = ({push, options}) => ({
    ObjectProperty(path) {
        const {ecmaVersion = 2024} = options;
        const {name} = path.node.key;
        
        if (name !== 'ecmaVersion')
            return;
        
        const valuePath = path.get('value');
        
        if (valuePath.node.value >= ecmaVersion)
            return;
        
        push({
            path: valuePath,
            ecmaVersion,
        });
    },
});
