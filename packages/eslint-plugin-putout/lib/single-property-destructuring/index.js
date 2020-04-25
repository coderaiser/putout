'use strict';

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep curly braces on one line when you have one destructuring property';

module.exports.include = () => [
    'VariableDeclarator[id.type="ObjectPattern"][id.properties.length=1]',
];

module.exports.filter = ({node, getText}) => {
    const text = getText(node.parent);
    
    if (!/(const|let|var) \{\n/.test(text))
        return;
    
    const assignRegExp = /\{\n?.*=.*\n?.*}/;
    
    if (assignRegExp.test(text))
        return false;
    
    return true;
};

module.exports.fix = ({text, node, getText}) => {
    const {id} = node;
    const idText = getText(id);
    
    const [property] = id.properties;
    const {key, value} = property;
    
    if (key.name === value.name)
        return text.replace(idText, `{${key.name}}`);
    
    return text.replace(idText, `{${key.name}: ${value.name}}`);
};

