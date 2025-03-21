import {operator, template} from 'putout';

const {replaceWith} = operator;

const astRequire = template.ast(`
    require('putout').types
`);

export const report = () => {
    return `"putout.types" should be used instead of "@babel/types"`;
};

const isRequire = (path) => path.get('callee').isIdentifier({
    name: 'require',
});

const isBabelTypes = (path) => path.get('arguments.0').isStringLiteral({
    value: '@babel/types',
});

export const traverse = ({push}) => ({
    CallExpression(path) {
        if (!isRequire(path))
            return;
        
        if (!isBabelTypes(path))
            return;
        
        push(path);
    },
});

export const fix = (path) => {
    replaceWith(path, astRequire);
};
