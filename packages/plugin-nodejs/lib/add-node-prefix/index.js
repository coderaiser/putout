import {isBuiltin} from 'node:module';
import {types, operator} from 'putout';

const {
    setLiteralValue,
    getTemplateValues,
} = operator;

const {isCallExpression} = types;

const REQUIRE = 'require("__a")';

export const report = ({value}) => {
    return `Use 'node:${value}' instead of '${value}'`;
};

export const fix = ({path, value}) => {
    if (isCallExpression(path)) {
        const arg = path.get('arguments.0');
        setLiteralValue(arg, `node:${value}`);
        
        return;
    }
    
    const {source} = path.node;
    setLiteralValue(source, `node:${value}`);
};

export const traverse = ({push}) => ({
    [REQUIRE](path) {
        const {__a} = getTemplateValues(path, REQUIRE);
        const {value} = __a;
        
        if (check(value))
            push({
                path,
                value,
            });
    },
    'ImportDeclaration|ImportExpression'(path) {
        const {value} = path.node.source;
        
        if (check(value))
            push({
                path,
                value,
            });
    },
});

function check(value) {
    if (!value)
        return false;
    
    if (value.startsWith('node:'))
        return false;
    
    return isBuiltin(value);
}
