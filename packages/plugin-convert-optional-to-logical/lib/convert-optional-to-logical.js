import {
    template,
    operator,
} from 'putout';

export const report = () => `Use Logical Expression instead of Optional Chaining`;

const {replaceWith} = operator;

export const fix = (path) => {
    const logical = getLogical(path);
    replaceWith(path, template.ast(logical));
};

export const include = () => [
    'OptionalMemberExpression',
    'OptionalCallExpression',
];

export const filter = (path) => {
    if (path.parentPath.isOptionalMemberExpression())
        return false;
    
    return !path.parentPath.isOptionalCallExpression();
};

function getLogical(path) {
    const list = path
        .toString()
        .split('?.');
    
    const n = list.length;
    let [member] = list;
    let i = 0;
    
    const logical = [member];
    
    while (++i < n) {
        member += compute(member, list[i]);
        logical.push(member);
    }
    
    return logical.join(' && ');
}

function compute(member, current) {
    const [first] = current;
    
    if (first === '(')
        return current;
    
    return `.${current}`;
}
