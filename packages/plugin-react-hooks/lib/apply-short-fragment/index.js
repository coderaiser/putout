import {types, operator} from 'putout';

const {
    jsxClosingFragment,
    jsxOpeningFragment,
    jsxFragment,
} = types;

const {replaceWith} = operator;

export const report = () => `Apply shorthand syntax for 'Fragment'`;

export const include = () => [
    'JSXOpeningElement',
];

export const fix = (path) => {
    const {parentPath} = path;
    const {children} = path.parentPath.node;
    
    replaceWith(parentPath, jsxFragment(jsxOpeningFragment(), jsxClosingFragment(), children));
};

export const filter = (path) => {
    if (path.node.attributes.length)
        return false;
    
    const namePath = path.get('name');
    
    if (namePath.isJSXIdentifier({name: 'Fragment'}))
        return true;
    
    if (!namePath.isJSXMemberExpression())
        return false;
    
    if (namePath.node.object.name !== 'React')
        return false;
    
    return namePath.node.property.name === 'Fragment';
};
