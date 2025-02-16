'use strict';

const {types, operator} = require(`putout`);

const {
    TemplateLiteral,
    TemplateElement,
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
    
    replaceWith(path, TemplateLiteral([TemplateElement({
        raw: value,
    })], []));
};

const {replaceWith} = operator;

module.exports.traverse = ({push}) => ({
    StringLiteral(path) {
        const {value} = path.node;
        
        if (value.includes('${'))
            return;
        
        if (value.includes(`'`))
            push(path);
    },
});
