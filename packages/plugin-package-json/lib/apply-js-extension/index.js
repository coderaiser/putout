import {extname} from 'node:path';
import {operator, types} from 'putout';

const {isStringLiteral} = types;
const {
    getProperties,
    __json,
    setLiteralValue,
} = operator;

export const report = (path) => {
    const {value} = path.node;
    const ext = extname(value);
    
    return `Use '.js' instead of '${ext}' in '${value}'`;
};

export const fix = (path) => {
    const {value} = path.node;
    setLiteralValue(path, value.replace(/\.[cm]js$/, '.js'));
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {typePath} = getProperties(__aPath, ['type']);
        const isModule = typePath && typePath.node.value.value === 'module';
        
        path.traverse({
            ObjectProperty(path) {
                const valuePath = path.get('value');
                
                if (!isStringLiteral(valuePath))
                    return;
                
                const {value} = path.node.value;
                
                if (isModule && value.endsWith('.mjs')) {
                    push(valuePath);
                    return;
                }
                
                if (!isModule && value.endsWith('.cjs'))
                    push(valuePath);
            },
        });
    },
});
