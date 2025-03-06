'use strict';

const {types, operator} = require('putout');
const {numericLiteral} = types;
const {replaceWith} = operator;

module.exports.report = ({ecmaVersion}) => `Set 'ecmaVersion' to: ${ecmaVersion}`;

module.exports.fix = ({path, ecmaVersion}) => {
    const node = numericLiteral(ecmaVersion);
    replaceWith(path, node);
};

module.exports.traverse = ({push, options}) => ({
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
