'use strict';

const {types, operator} = require(`putout`);
const {
    templateElement,
    templateLiteral,
} = types;

module.exports.report = () => `Use backticks instead of quotes`;

module.exports.fix = (path) => {
    const value = path
        .node
        .value
        .replaceAll('\\', '\\\\')
        .replaceAll('\n', '\\n');
    
    const {parentPath} = path;
    
    if (parentPath.isObjectProperty() && path === parentPath.get('key'))
        parentPath.node.computed = true;
    
    replaceWith(path, templateLiteral([templateElement({
        raw: value,
    })], []));
};

const {replaceWith} = operator;

module.exports.traverse = ({push}) => ({
    StringLiteral(path) {
        const {value} = path.node;
        
        if (value.includes('${'))
            return;
        
        if (value.includes('`'))
            return;
        
        if (value.includes(`'`))
            push(path);
    },
});
